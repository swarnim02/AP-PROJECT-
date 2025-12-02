const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const { validateSignup, validateLogin } = require("../validation/authValidation");
const { generateToken } = require("../utils/tokenUtils");

// SIGNUP
const signup = async (req, res) => {
    try {
      const { name, email, password, college, year, role, gender } = req.body;
  
      // Validation
      const err = validateSignup(name, email, password, college, year);
      if (err) return res.status(400).json({ message: err });
  
      // Check user exists
      const exists = await prisma.user.findUnique({ where: { email } });
      if (exists) return res.status(400).json({ message: "Email already exists" });
  
      // Create user
      const hashed = await bcrypt.hash(password, 10);
  
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashed,
          college,
          year,
          gender,
          role: role || "student",
          profileApproved: null
        }
      });
  
      res.json({ message: "Signup successful", user });
  
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  };
  
// LOGIN
const login = async (req, res) => {
    try {
      console.log('=== LOGIN ATTEMPT ===');
      const { email, password } = req.body;
      console.log('Login attempt for email:', email);
  
      const err = validateLogin(email, password);
      if (err) {
        console.log('Validation error:', err);
        return res.status(400).json({ message: err });
      }
  
      console.log('Searching for user in database...');
      const user = await prisma.user.findUnique({ where: { email } });
      
      if (!user) {
        console.log('User not found for email:', email);
        return res.status(400).json({ message: "User not found" });
      }
      
      console.log('User found:', user.email, 'Role:', user.role);
  
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        console.log('Invalid password for user:', email);
        return res.status(400).json({ message: "Invalid password" });
      }
      
      console.log('Password valid, generating token...');
      const token = generateToken(user);
      console.log('Token generated successfully');
      console.log('=== LOGIN SUCCESS ===');
  
      res.json({ message: "Login successful", token });
  
    } catch (err) {
      console.error('=== LOGIN ERROR ===');
      console.error('Error details:', err);
      console.error('Stack trace:', err.stack);
      res.status(500).json({ error: 'Server error during login' });
    }
  };

const getMyProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        college: true,
        year: true,
        role: true,
        profileApproved: true,
        phone: true,
        address: true,
        guardianName: true,
        guardianPhone: true
      }
    });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json({ user });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Error fetching profile' });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { name, college, year, phone, address, guardianName, guardianPhone } = req.body;
    const userId = req.user.id;
    
    console.log('=== PROFILE UPDATE DEBUG ===');
    console.log('User ID:', userId);
    console.log('Request body:', req.body);
    
    // Check if this is a complete profile submission
    const isCompleteProfile = phone && address && guardianName && guardianPhone;
    console.log('Is complete profile?', isCompleteProfile);
    
    const updateData = { 
      name, 
      college, 
      year: year ? parseInt(year) : null,
      phone,
      address,
      guardianName,
      guardianPhone
    };
    
    // Set profileApproved to null when complete profile is submitted for approval
    if (isCompleteProfile) {
      updateData.profileApproved = null;
      console.log('Setting profileApproved to null');
    }
    
    console.log('Update data:', updateData);
    
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: { 
        id: true, 
        name: true, 
        email: true, 
        college: true, 
        year: true, 
        role: true,
        profileApproved: true,
        phone: true,
        address: true,
        guardianName: true,
        guardianPhone: true
      }
    });
    
    console.log('Updated user:', updatedUser);
    console.log('=== END DEBUG ===');
    
    res.json({
      success: true,
      message: isCompleteProfile ? 'Profile submitted for approval' : 'Profile updated successfully',
      user: updatedUser
    });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating profile: ' + error.message
    });
  }
};

const approveProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    
    console.log('=== APPROVING PROFILE ===');
    console.log('User ID to approve:', userId);
    
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(userId) },
      data: { profileApproved: true }
    });
    
    console.log('Updated user after approval:', updatedUser);
    
    // For 1st year students, auto-allocate room after profile approval
    if (updatedUser.year === 1) {
      console.log('User is 1st year, attempting auto-allocation');
      const availableRooms = await prisma.room.findMany({
        where: {
          status: 'Available',
          gender: updatedUser.gender,
          yearGroup: 1
        },
        include: { allotments: { where: { status: 'approved' } } }
      });
      
      const roomsWithCapacity = availableRooms.filter(room => 
        room.allotments.length < room.capacity
      );
      
      console.log('Available rooms for allocation:', roomsWithCapacity.length);
      
      if (roomsWithCapacity.length > 0) {
        const randomIndex = Math.floor(Math.random() * roomsWithCapacity.length);
        const selectedRoom = roomsWithCapacity[randomIndex];
        
        console.log('Selected room for allocation:', selectedRoom.roomNumber);
        
        await prisma.allotment.create({
          data: {
            studentId: parseInt(userId),
            roomId: selectedRoom.id,
            status: 'approved'
          }
        });
        
        // Update room status if capacity reached
        if (selectedRoom.allotments.length + 1 >= selectedRoom.capacity) {
          await prisma.room.update({
            where: { id: selectedRoom.id },
            data: { status: 'Occupied' }
          });
        }
        
        console.log('Room allocated successfully');
      }
    }
    
    console.log('=== PROFILE APPROVAL COMPLETE ===');
    
    res.json({
      success: true,
      message: 'Profile approved successfully'
    });
  } catch (error) {
    console.error('Approve profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Error approving profile'
    });
  }
};

const disapproveProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    
    console.log('=== DISAPPROVING PROFILE ===');
    console.log('User ID to disapprove:', userId);
    
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(userId) },
      data: { 
        profileApproved: false,
        phone: null,
        address: null,
        guardianName: null,
        guardianPhone: null
      }
    });
    
    console.log('Updated user after disapproval:', updatedUser);
    console.log('=== PROFILE DISAPPROVAL COMPLETE ===');
    
    res.json({
      success: true,
      message: 'Profile disapproved and reset'
    });
  } catch (error) {
    console.error('Disapprove profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Error disapproving profile'
    });
  }
};

const getPendingProfiles = async (req, res) => {
  try {
    console.log('=== FETCHING PENDING PROFILES ===');
    
    const pendingUsers = await prisma.user.findMany({
      where: {
        role: 'student',
        profileApproved: null,
        phone: { not: null }
      },
      select: {
        id: true,
        name: true,
        email: true,
        college: true,
        year: true,
        gender: true,
        phone: true,
        address: true,
        guardianName: true,
        guardianPhone: true,
        profileApproved: true
      }
    });
    
    console.log('Found pending profiles:', pendingUsers.length);
    console.log('Profiles:', pendingUsers);
    console.log('=== END PENDING PROFILES ===');
    
    res.json({ profiles: pendingUsers });
  } catch (error) {
    console.error('Get pending profiles error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
    
module.exports = { signup, login, getMyProfile, updateProfile, approveProfile, disapproveProfile, getPendingProfiles };