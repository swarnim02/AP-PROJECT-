const { PrismaClient } = require("../prisma/generated/prisma");
const prisma = new PrismaClient();

exports.allUsers = async (req, res) => {
  const data = await prisma.user.findMany();
  res.json(data);
};

exports.allRooms = async (req, res) => {
  const data = await prisma.room.findMany({
    include: { allotments: true }
  });
  res.json(data);
};

exports.allAllotments = async (req, res) => {
  const data = await prisma.allotment.findMany({
    include: { student: true, room: true }
  });
  res.json(data);
};
