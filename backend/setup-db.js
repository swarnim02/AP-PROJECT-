const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function setupDatabase() {
  try {
    console.log('🔄 Setting up database...');
    
    // Test connection
    await prisma.$connect();
    console.log('✅ Database connected');
    
    // Create admin user
    const existingAdmin = await prisma.user.findUnique({
      where: { email: 'admin@hostel.com' }
    }).catch(() => null);

    if (!existingAdmin) {
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
    const roomCount = await prisma.room.count().catch(() => 0);
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
    }

    console.log('🎉 Database setup complete!');
    
  } catch (error) {
    console.error('❌ Database setup error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

setupDatabase();