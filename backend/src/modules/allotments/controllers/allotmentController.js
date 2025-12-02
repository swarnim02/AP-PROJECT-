const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const autoAllocate = require("../utils/autoAllocate");
const {
ensureStudentHasNoAllotment,
ensureRoomAvailable
} = require("../validation/validation");

// APPLY FOR ROOM (any year students with approved profile)
exports.applyForRoom = async (req, res) => {
try {
   const studentId = req.user.id;
   const roomId = parseInt(req.params.roomId);

   const student = await prisma.user.findUnique({
   where: { id: studentId },
   include: { allotments: true }
   });

   if (!student.profileApproved) {
     return res.status(400).json({ message: 'Profile must be approved before applying for rooms' });
   }

   if (student.year === 1) {
     return res.status(400).json({ message: 'First year students get automatic room allocation after profile approval' });
   }

   const studentCheck = ensureStudentHasNoAllotment(student);
   if (studentCheck)
   return res.status(400).json({ message: studentCheck });

   const room = await prisma.room.findUnique({
   where: { id: roomId },
   include: { allotments: { where: { status: 'approved' } } }
   });

   if (!room) {
     return res.status(404).json({ message: 'Room not found' });
   }

   if (room.allotments.length >= room.capacity) {
     return res.status(400).json({ message: 'Room is full' });
   }

   if (room.yearGroup > student.year) {
     return res.status(400).json({ message: 'Room not available for your year group' });
   }

   if (room.gender !== student.gender) {
     return res.status(400).json({ message: 'Room gender does not match your profile' });
   }

   // Create approved allotment (first come first serve)
   const allotment = await prisma.allotment.create({
     data: {
       studentId,
       roomId,
       status: 'approved'
     }
   });

   // Update room status if capacity reached
   if (room.allotments.length + 1 >= room.capacity) {
     await prisma.room.update({
       where: { id: roomId },
       data: { status: 'Occupied' }
     });
   }

   res.status(200).json({
     message: "Room allocated successfully",
     allotment
   });

 } catch (err) {
   console.error(err);
   res.status(500).json({ error: "Server error" });
 }
};

// This function is no longer needed as 1st year allocation happens automatically after profile approval

// GET MY ALLOTMENT
exports.myAllotment = async (req, res) => {
 try {
   const allotment = await prisma.allotment.findFirst({
     where: { studentId: req.user.id },
     include: {
       room: true,
       student: {
         select: { id: true, name: true, email: true, year: true }
       }
     }
   });

   if (!allotment)
     return res.status(404).json({ message: "No allotment found" });

   res.json(allotment);

 } catch (err) {
   res.status(500).json({ error: err });
 }
};

// ADMIN — APPROVE ALLOTMENT
exports.adminApprove = async (req, res) => {
 try {
   const allotmentId = parseInt(req.params.allotmentId);

   const allotment = await prisma.allotment.findUnique({
     where: { id: allotmentId },
     include: { room: true }
   });

   if (!allotment)
     return res.status(400).json({ message: "No allotment found" });

   // Update allotment status
   await prisma.allotment.update({
     where: { id: allotmentId },
     data: { status: 'approved' }
   });

   // Update room status if capacity reached
   if (allotment.roomId) {
     const allotmentsCount = await prisma.allotment.count({
       where: {
         roomId: allotment.roomId,
         status: 'approved'
       }
     });

     if (allotmentsCount >= allotment.room.capacity) {
       await prisma.room.update({
         where: { id: allotment.roomId },
         data: { status: 'Occupied' }
       });
     }
   }

   res.json({
     message: "Allotment Approved",
     allotment
   });

 } catch (err) {
   res.status(500).json({ error: err });
 }
};

// GET ALL ALLOTMENTS (ADMIN)
exports.getAllAllotments = async (req, res) => {
  try {
    const data = await prisma.allotment.findMany({
      include: { room: true, student: true }
    });

    res.json(data);

  } catch (err) {
    res.status(500).json({ error: err });
  }
};
