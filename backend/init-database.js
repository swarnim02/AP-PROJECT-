const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function initDatabase() {
  try {
    console.log('🔄 Initializing database...');
    
    // Test connection first
    await prisma.$connect();
    console.log('✅ Database connected');

    // Check if tables exist by trying a simple query
    try {
      await prisma.user.count();
      console.log('✅ Tables already exist');
    } catch (error) {
      console.log('❌ Tables do not exist, creating them...');
      
      // Execute raw SQL to create tables
      await prisma.$executeRaw`
        CREATE TABLE IF NOT EXISTS "User" (
          "id" SERIAL NOT NULL,
          "name" TEXT NOT NULL,
          "email" TEXT NOT NULL,
          "password" TEXT NOT NULL,
          "college" TEXT NOT NULL,
          "year" INTEGER NOT NULL,
          "gender" TEXT NOT NULL,
          "role" TEXT NOT NULL DEFAULT 'student',
          "profileApproved" BOOLEAN,
          "phone" TEXT,
          "address" TEXT,
          "guardianName" TEXT,
          "guardianPhone" TEXT,
          "switchCount" INTEGER NOT NULL DEFAULT 0,
          "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          CONSTRAINT "User_pkey" PRIMARY KEY ("id")
        );
      `;

      await prisma.$executeRaw`
        CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "User"("email");
      `;

      await prisma.$executeRaw`
        CREATE TABLE IF NOT EXISTS "Room" (
          "id" SERIAL NOT NULL,
          "roomNumber" TEXT NOT NULL,
          "capacity" INTEGER NOT NULL,
          "status" TEXT NOT NULL DEFAULT 'Available',
          "yearGroup" INTEGER NOT NULL,
          "gender" TEXT NOT NULL,
          "hostelName" TEXT NOT NULL,
          "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
        );
      `;

      await prisma.$executeRaw`
        CREATE UNIQUE INDEX IF NOT EXISTS "Room_roomNumber_key" ON "Room"("roomNumber");
      `;

      await prisma.$executeRaw`
        CREATE TABLE IF NOT EXISTS "Allotment" (
          "id" SERIAL NOT NULL,
          "studentId" INTEGER NOT NULL,
          "roomId" INTEGER NOT NULL,
          "dateOfAllotment" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "status" TEXT NOT NULL DEFAULT 'pending',
          "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          CONSTRAINT "Allotment_pkey" PRIMARY KEY ("id")
        );
      `;

      await prisma.$executeRaw`
        ALTER TABLE "Allotment" ADD CONSTRAINT IF NOT EXISTS "Allotment_studentId_fkey" 
        FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
      `;

      await prisma.$executeRaw`
        ALTER TABLE "Allotment" ADD CONSTRAINT IF NOT EXISTS "Allotment_roomId_fkey" 
        FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
      `;

      console.log('✅ Tables created successfully');
    }

    // Create admin user
    const adminExists = await prisma.user.findUnique({
      where: { email: 'admin@hostel.com' }
    }).catch(() => null);

    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await prisma.user.create({
        data: {
          name: 'Admin User',
          email: 'admin@hostel.com',
          password: hashedPassword,
          college: 'Admin College',
          year: 1,
          gender: 'Male',
          role: 'admin',
          profileApproved: true
        }
      });
      console.log('✅ Admin user created');
    } else {
      console.log('✅ Admin user already exists');
    }

    // Create sample rooms
    const roomCount = await prisma.room.count();
    if (roomCount === 0) {
      const sampleRooms = [
        { roomNumber: '101', capacity: 2, yearGroup: 1, gender: 'Male', hostelName: 'Sunrise Hostel', status: 'Available' },
        { roomNumber: '102', capacity: 2, yearGroup: 1, gender: 'Male', hostelName: 'Sunrise Hostel', status: 'Available' },
        { roomNumber: '103', capacity: 2, yearGroup: 1, gender: 'Female', hostelName: 'Moonlight Hostel', status: 'Available' },
        { roomNumber: '201', capacity: 3, yearGroup: 2, gender: 'Male', hostelName: 'Sunrise Hostel', status: 'Available' },
        { roomNumber: '202', capacity: 3, yearGroup: 2, gender: 'Female', hostelName: 'Moonlight Hostel', status: 'Available' }
      ];

      for (const room of sampleRooms) {
        await prisma.room.create({ data: room });
      }
      console.log('✅ Sample rooms created');
    } else {
      console.log('✅ Rooms already exist');
    }

    console.log('🎉 Database initialization complete!');
    
  } catch (error) {
    console.error('❌ Database initialization error:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

initDatabase();