const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const {
  validateRoomInput,
  ensureCapacityNotLowerThanCurrent
} = require("./roomValidation");

// CREATE ROOM (ADMIN)
exports.createRoom = async (req, res) => {
  try {
    const { roomNumber, capacity, yearGroup } = req.body;

    const err = validateRoomInput(roomNumber, capacity, yearGroup);
    if (err) return res.status(400).json({ message: err });

    const room = await prisma.room.create({
      data: {
        roomNumber,
        capacity,
        status: "Available", // default
        yearGroup
      }
    });

    res.json({
      message: "Room created",
      room
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

// UPDATE ROOM (ADMIN)
exports.updateRoom = async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    const { capacity, yearGroup, status } = req.body;

    const room = await prisma.room.findUnique({
      where: { id },
      include: { allotments: true }
    });

    if (!room)
      return res.status(404).json({ message: "Room not found" });

    const currentCount = room.allotments.length;

    if (capacity) {
      const capErr = ensureCapacityNotLowerThanCurrent(currentCount, capacity);
      if (capErr) return res.status(400).json({ message: capErr });
    }

    const updatedRoom = await prisma.room.update({
      where: { id },
      data: {
        capacity: capacity || room.capacity,
        yearGroup: yearGroup || room.yearGroup,
        status: status || room.status
      }
    });

    res.json({
      message: "Room updated",
      updatedRoom
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

// DELETE ROOM
exports.deleteRoom = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const room = await prisma.room.findUnique({
      where: { id },
      include: { allotments: true }
    });

    if (!room)
      return res.status(404).json({ message: "Room not found" });

    if (room.allotments.length > 0)
      return res.status(400).json({
        message: "Cannot delete room with current allotments"
      });

    await prisma.room.delete({ where: { id } });

    res.json({ message: "Room deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

// GET ALL ROOMS
exports.getAllRooms = async (req, res) => {
  try {
    const rooms = await prisma.room.findMany({
      include: { allotments: true }
    });
    res.json(rooms);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

// GET ROOM BY ID
exports.getRoomById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const room = await prisma.room.findUnique({
      where: { id },
      include: { allotments: true }
    });

    if (!room)
      return res.status(404).json({ message: "Room not found" });

    res.json(room);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};
