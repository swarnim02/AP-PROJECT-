require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function initDatabase() {
  try {
    console.log('🔄 Initializing database...');
    
    // Test connection first
    await prisma.$connect();
    console.log('✅ Database connected');

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

    // Create sample rooms for both boys and girls
    const roomCount = await prisma.room.count();
    if (roomCount === 0) {
      const sampleRooms = [
        // Boys rooms - Year 1
        { roomNumber: 'B101', capacity: 2, yearGroup: 1, gender: 'Male', hostelName: 'Sunrise Boys Hostel', status: 'Available' },
        { roomNumber: 'B102', capacity: 2, yearGroup: 1, gender: 'Male', hostelName: 'Sunrise Boys Hostel', status: 'Available' },
        { roomNumber: 'B103', capacity: 3, yearGroup: 1, gender: 'Male', hostelName: 'Sunrise Boys Hostel', status: 'Available' },
        { roomNumber: 'B104', capacity: 2, yearGroup: 1, gender: 'Male', hostelName: 'Sunrise Boys Hostel', status: 'Available' },
        
        // Boys rooms - Year 2
        { roomNumber: 'B201', capacity: 3, yearGroup: 2, gender: 'Male', hostelName: 'Sunrise Boys Hostel', status: 'Available' },
        { roomNumber: 'B202', capacity: 2, yearGroup: 2, gender: 'Male', hostelName: 'Sunrise Boys Hostel', status: 'Available' },
        { roomNumber: 'B203', capacity: 3, yearGroup: 2, gender: 'Male', hostelName: 'Sunrise Boys Hostel', status: 'Available' },
        
        // Boys rooms - Year 3
        { roomNumber: 'B301', capacity: 2, yearGroup: 3, gender: 'Male', hostelName: 'Sunrise Boys Hostel', status: 'Available' },
        { roomNumber: 'B302', capacity: 3, yearGroup: 3, gender: 'Male', hostelName: 'Sunrise Boys Hostel', status: 'Available' },
        
        // Girls rooms - Year 1
        { roomNumber: 'G101', capacity: 2, yearGroup: 1, gender: 'Female', hostelName: 'Moonlight Girls Hostel', status: 'Available' },
        { roomNumber: 'G102', capacity: 2, yearGroup: 1, gender: 'Female', hostelName: 'Moonlight Girls Hostel', status: 'Available' },
        { roomNumber: 'G103', capacity: 3, yearGroup: 1, gender: 'Female', hostelName: 'Moonlight Girls Hostel', status: 'Available' },
        { roomNumber: 'G104', capacity: 2, yearGroup: 1, gender: 'Female', hostelName: 'Moonlight Girls Hostel', status: 'Available' },
        
        // Girls rooms - Year 2
        { roomNumber: 'G201', capacity: 3, yearGroup: 2, gender: 'Female', hostelName: 'Moonlight Girls Hostel', status: 'Available' },
        { roomNumber: 'G202', capacity: 2, yearGroup: 2, gender: 'Female', hostelName: 'Moonlight Girls Hostel', status: 'Available' },
        { roomNumber: 'G203', capacity: 3, yearGroup: 2, gender: 'Female', hostelName: 'Moonlight Girls Hostel', status: 'Available' },
        
        // Girls rooms - Year 3
        { roomNumber: 'G301', capacity: 2, yearGroup: 3, gender: 'Female', hostelName: 'Moonlight Girls Hostel', status: 'Available' },
        { roomNumber: 'G302', capacity: 3, yearGroup: 3, gender: 'Female', hostelName: 'Moonlight Girls Hostel', status: 'Available' }
      ];

      for (const room of sampleRooms) {
        await prisma.room.create({ data: room });
      }
      console.log('✅ Sample rooms created (18 rooms total - 9 boys, 9 girls)');
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