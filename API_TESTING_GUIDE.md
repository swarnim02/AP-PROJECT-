# 🧪 Hostel Room Allotment API Testing Guide

## Prerequisites
1. Start the server: `npm start`
2. Server runs on: `http://localhost:5002`
3. Use Postman, curl, or any API testing tool

---

## 🔐 Authentication Module (Ishita's Work)

### 1. Student Signup
**POST** `http://localhost:5002/auth/signup`

**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "name": "John Doe",
  "email": "john@student.com",
  "password": "password123",
  "college": "ABC College",
  "year": 2,
  "role": "student"
}
```

**Expected Response:**
```json
{
  "message": "Signup successful",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@student.com",
    "role": "student",
    "college": "ABC College",
    "year": 2
  }
}
```

### 2. Admin Signup
**POST** `http://localhost:5002/auth/signup`

**Body (JSON):**
```json
{
  "name": "Admin User",
  "email": "admin@hostel.com",
  "password": "admin123",
  "college": "ABC College",
  "year": 1,
  "role": "admin"
}
```

### 3. Login (Student/Admin)
**POST** `http://localhost:5002/auth/login`

**Body (JSON):**
```json
{
  "email": "john@student.com",
  "password": "password123"
}
```

**Expected Response:**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**⚠️ IMPORTANT: Save this token for all subsequent requests!**

---

## 🏠 Room Module (Swarnim's Work)

**Note:** All room endpoints require authentication. Add this header to all requests:
```
Authorization: Bearer YOUR_JWT_TOKEN_HERE
```

### 4. Create Room (Admin Only)
**POST** `http://localhost:5002/rooms/create`

**Headers:**
```
Content-Type: application/json
Authorization: Bearer YOUR_JWT_TOKEN_HERE
```

**Body (JSON):**
```json
{
  "roomNumber": "R101",
  "capacity": 2,
  "yearGroup": 2
}
```

**Expected Response:**
```json
{
  "message": "Room created",
  "room": {
    "id": 1,
    "roomNumber": "R101",
    "capacity": 2,
    "status": "Available",
    "yearGroup": 2
  }
}
```

### 5. Get All Rooms
**GET** `http://localhost:5002/rooms/all`

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN_HERE
```

### 6. Get Room by ID
**GET** `http://localhost:5002/rooms/1`

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN_HERE
```

### 7. Update Room (Admin Only)
**PUT** `http://localhost:5002/rooms/update/1`

**Headers:**
```
Content-Type: application/json
Authorization: Bearer YOUR_JWT_TOKEN_HERE
```

**Body (JSON):**
```json
{
  "capacity": 3,
  "status": "Available"
}
```

### 8. Delete Room (Admin Only)
**DELETE** `http://localhost:5002/rooms/delete/1`

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN_HERE
```

---

## 🎯 Allotment Module (Ansh's Work)

### 9. Apply for Room (Student)
**POST** `http://localhost:5002/allotment/apply/1`

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN_HERE
```

**Body:** Empty `{}`

**Expected Response:**
```json
{
  "message": "Room allotted successfully",
  "allotment": {
    "id": 1,
    "studentId": 1,
    "roomId": 1,
    "dateOfAllotment": "2024-01-01T00:00:00.000Z"
  }
}
```

### 10. Get My Allotment (Student)
**GET** `http://localhost:5002/allotment/my`

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN_HERE
```

### 11. Approve Allotment (Admin)
**POST** `http://localhost:5002/allotment/approve/1`

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN_HERE
```

**Body:** Empty `{}`

### 12. Get All Allotments (Admin)
**GET** `http://localhost:5002/allotment/all`

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN_HERE
```

---

## 👨‍💼 Admin Module (Core App)

### 13. Get All Users (Admin)
**GET** `http://localhost:5002/admin/users`

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN_HERE
```

### 14. Get All Rooms (Admin)
**GET** `http://localhost:5002/admin/rooms`

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN_HERE
```

### 15. Get All Allotments (Admin)
**GET** `http://localhost:5002/admin/allotments`

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN_HERE
```

---

## 🧪 Testing Sequence

### Step 1: Test Authentication
1. Create a student account (Test #1)
2. Create an admin account (Test #2)
3. Login as student and save token (Test #3)
4. Login as admin and save token (Test #3)

### Step 2: Test Room Management (Use Admin Token)
1. Create 2-3 rooms (Test #4)
2. Get all rooms (Test #5)
3. Get specific room (Test #6)
4. Update a room (Test #7)

### Step 3: Test Allotments (Use Student Token)
1. Apply for a room (Test #9)
2. Check my allotment (Test #10)

### Step 4: Test Admin Functions (Use Admin Token)
1. View all users (Test #13)
2. View all rooms (Test #14)
3. View all allotments (Test #15)
4. Approve allotment (Test #11)

---

## 🚨 Common Error Responses

### 401 Unauthorized
```json
{
  "message": "Access denied. No token provided."
}
```
**Fix:** Add Authorization header with Bearer token

### 400 Bad Request
```json
{
  "message": "All fields (name, email, password, college, year) are required."
}
```
**Fix:** Check request body has all required fields

### 404 Not Found
```json
{
  "message": "Room not found"
}
```
**Fix:** Use valid room/user IDs

### 500 Server Error
```json
{
  "error": "Server error"
}
```
**Fix:** Check server logs for database/code issues

---

## 📝 Testing Checklist

- [ ] Student signup works
- [ ] Admin signup works  
- [ ] Student login returns token
- [ ] Admin login returns token
- [ ] Create room works (admin)
- [ ] Get all rooms works
- [ ] Update room works (admin)
- [ ] Delete room works (admin)
- [ ] Apply for room works (student)
- [ ] Get my allotment works (student)
- [ ] Get all allotments works (admin)
- [ ] Approve allotment works (admin)
- [ ] Admin endpoints work
- [ ] Proper error handling for invalid requests

---

## 🔧 Quick Start Commands

```bash
# Start server
npm start

# Test basic endpoint
curl http://localhost:5002/

# Test signup
curl -X POST http://localhost:5002/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@test.com","password":"password123","college":"Test College","year":2}'

# Test login
curl -X POST http://localhost:5002/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"password123"}'
```

**Copy the token from login response and use it in Authorization header for protected routes!**