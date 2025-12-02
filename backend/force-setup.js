const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function forceSetup() {
  try {
    console.log('🔄 Force setting up database with Supabase...');
    
    // Connect to database
    await prisma.$connect();
    console.log('✅ Connected to Supabase');

    // Force create admin user (ignore if exists)
    try {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      
      await prisma.user.upsert({
        where: { email: 'admin@hostel.com' },
        update: {},
        create: {
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
      console.log('✅ Admin user ready');
    } catch (e) {
      console.log('Admin user handling:', e.message);
    }

    // Force create sample rooms
    const sampleRooms = [
      { roomNumber: '101', capacity: 2, yearGroup: 1, gender: 'Male', hostelName: 'Sunrise Hostel', status: 'Available' },
      { roomNumber: '102', capacity: 2, yearGroup: 1, gender: 'Male', hostelName: 'Sunrise Hostel', status: 'Available' },
      { roomNumber: '103', capacity: 2, yearGroup: 1, gender: 'Female', hostelName: 'Moonlight Hostel', status: 'Available' },
      { roomNumber: '201', capacity: 3, yearGroup: 2, gender: 'Male', hostelName: 'Sunrise Hostel', status: 'Available' },
      { roomNumber: '202', capacity: 3, yearGroup: 2, gender: 'Female', hostelName: 'Moonlight Hostel', status: 'Available' }
    ];

    for (const room of sampleRooms) {
      try {
        await prisma.room.upsert({
          where: { roomNumber: room.roomNumber },
          update: {},
          create: room
        });
      } catch (e) {
        console.log(`Room ${room.roomNumber} handling:`, e.message);
      }
    }
    console.log('✅ Sample rooms ready');

    console.log('🎉 Force setup complete!');
    
  } catch (error) {
    console.error('❌ Force setup error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

forceSetup();