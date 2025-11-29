const axios = require('axios');

const BASE_URL = 'http://localhost:5000';
let authToken = '';

async function testEndpoints() {
  console.log('🧪 Testing Hostel Room Allotment API Endpoints\n');

  try {
    // Test 1: Signup
    console.log('1. Testing Signup...');
    const signupRes = await axios.post(`${BASE_URL}/auth/signup`, {
      name: 'Test Student',
      email: 'test@student.com',
      password: 'password123',
      college: 'Test College',
      year: 2,
      role: 'student'
    });
    console.log('✅ Signup successful');

    // Test 2: Login
    console.log('2. Testing Login...');
    const loginRes = await axios.post(`${BASE_URL}/auth/login`, {
      email: 'test@student.com',
      password: 'password123'
    });
    authToken = loginRes.data.token;
    console.log('✅ Login successful');

    // Test 3: Create Room (Admin)
    console.log('3. Testing Create Room...');
    const roomRes = await axios.post(`${BASE_URL}/rooms/create`, {
      roomNumber: 'R101',
      capacity: 2,
      yearGroup: 2
    }, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    console.log('✅ Room created');

    // Test 4: Get All Rooms
    console.log('4. Testing Get All Rooms...');
    await axios.get(`${BASE_URL}/rooms/all`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    console.log('✅ Get rooms successful');

    // Test 5: Apply for Room
    console.log('5. Testing Apply for Room...');
    await axios.post(`${BASE_URL}/allotment/apply/1`, {}, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    console.log('✅ Room application successful');

    // Test 6: Get My Allotment
    console.log('6. Testing Get My Allotment...');
    await axios.get(`${BASE_URL}/allotment/my`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    console.log('✅ Get allotment successful');

    console.log('\n🎉 All endpoints working correctly!');

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
  }
}

module.exports = testEndpoints;