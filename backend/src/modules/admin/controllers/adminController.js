const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.allUsers = async (req, res) => {
 try {
   const users = await prisma.user.findMany({
     select: {
       id: true,
       name: true,
       email: true,
       role: true,
       college: true,
       year: true,
       gender: true,
       profileApproved: true,
       phone: true,
       address: true,
       guardianName: true,
       guardianPhone: true
     }
   });
   res.json({ users });
 } catch (error) {
   console.error(error);
   res.status(500).json({ error: 'Server error' });
 }
};

exports.allRooms = async (req, res) => {
 try {
   const rooms = await prisma.room.findMany({
     include: {
       allotments: {
         where: { status: 'approved' }
       }
     }
   });
  
   // Add occupied count and availability status
   const roomsWithStats = rooms.map(room => ({
     ...room,
     occupiedSeats: room.allotments.length,
     isAvailable: room.allotments.length < room.capacity
   }));
  
   res.json({ rooms: roomsWithStats });
 } catch (error) {
   console.error(error);
   res.status(500).json({ error: 'Server error' });
 }
};

exports.allAllotments = async (req, res) => {
 try {
   const allotments = await prisma.allotment.findMany({
     include: {
       student: {
         select: { id: true, name: true, email: true, year: true, gender: true }
       },
       room: true
     }
   });
   res.json({ allotments });
 } catch (error) {
   console.error(error);
   res.status(500).json({ error: 'Server error' });
 }
};
