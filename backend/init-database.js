require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

// Create a fresh Prisma client instance for initialization
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

async function initDatabase() {
  try {
    console.log('🔄 Initializing database...');
    
    // Test connection first
    await prisma.$connect();
    console.log('✅ Database connected');

    // Use Prisma's db push to sync schema instead of raw SQL
    console.log('🔄 Syncing database schema...');
    
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