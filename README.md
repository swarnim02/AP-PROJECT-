# 🏠 Hostel Room Allotment System

A comprehensive full-stack web application for managing hostel room allocations with separate student and admin portals.

## 🌐 Live Demo

- **Frontend**: https://ap-project-1-a3e5.onrender.com
- **Backend API**: https://ap-project-v67b.onrender.com

## 🔐 Admin Access for Evaluators

**Admin Login Credentials:**
- **Email**: `admin@hostel.com`
- **Password**: `admin123`

Use these credentials to access the admin panel and test all administrative features including room management, user management, and profile approvals.

## 🚀 Project Overview

**Team:** Devs  
**Tech Stack:** Node.js + Express + React + Prisma + PostgreSQL  
**Architecture:** Full-stack web application with REST API

## 📁 Project Structure

```
AP-PROJECT-/
├── backend/                 # Node.js + Express API
│   ├── src/
│   │   ├── modules/
│   │   │   ├── auth/        # Authentication & Profile Management
│   │   │   ├── rooms/       # Room Management
│   │   │   ├── allotments/  # Room Allocation System
│   │   │   └── admin/       # Admin Panel Operations
│   │   ├── middleware/      # JWT Authentication
│   │   ├── config/          # Database Configuration
│   │   └── app.js           # Express App
│   ├── prisma/              # Database Schema & Migrations
│   ├── .env                 # Environment Variables
│   ├── package.json         # Dependencies
│   └── server.js            # Server Entry Point
│
├── frontend/                # React Application
│   ├── src/
│   │   ├── components/      # React Components
│   │   │   ├── Dashboard.js         # Student Dashboard
│   │   │   ├── AdminDashboard.js    # Admin Dashboard
│   │   │   ├── ProfileForm.js       # Profile Management
│   │   │   ├── RoomManagement.js    # Room CRUD Operations
│   │   │   ├── UserManagement.js    # User Administration
│   │   │   └── ProfileApproval.js   # Profile Approval System
│   │   ├── services/        # API Integration
│   │   └── App.js           # Main App & Routing
│   ├── public/              # Static Assets
│   ├── .env                 # Environment Variables
│   └── package.json         # Dependencies
│
├── .gitignore               # Git Ignore Rules
└── README.md                # Project Documentation
```

## 🛠️ Tech Stack

### Backend
- **Framework:** Node.js + Express.js
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** JWT (JSON Web Tokens)
- **API:** RESTful endpoints
- **Deployment:** Render

### Frontend
- **Framework:** React 18
- **Routing:** React Router DOM
- **Styling:** Pure CSS (Black & White Theme)
- **HTTP Client:** Fetch API
- **Deployment:** Render Static Site

## 🎯 Features

### 🔐 Authentication System
- Student registration and login
- JWT-based authentication
- Role-based access control (Student/Admin)
- Secure password hashing with bcrypt
- Protected routes and middleware

### 👨🎓 Student Portal
- **Dashboard:** Overview with room allocation status
- **Profile Management:** Complete profile with personal details
- **Profile Approval:** Submit profile for admin approval
- **Room Allocation:** 
  - **1st Year:** Automatic random room allocation after profile approval
  - **2nd+ Year:** Manual room selection from available options
- **Application Status:** Track profile and room allocation progress
- **Room Details:** View allocated room and hostel information

### 👨💼 Admin Panel
- **Dashboard:** System statistics and overview
- **Room Management:** Create, update, delete rooms with capacity tracking
- **Profile Approval:** Review and approve/reject student profiles
- **User Management:** View all students with profile and room status
- **Allocation Monitoring:** Track room occupancy and availability
- **Real-time Updates:** Live room capacity and allocation status

## 📊 Database Schema

### User Table
```sql
- id (Primary Key)
- name (String)
- email (Unique)
- password (Hashed)
- role (student/admin)
- college (String)
- year (Integer)
- gender (Male/Female)
- profileApproved (Boolean)
- phone (String)
- address (String)
- guardianName (String)
- guardianPhone (String)
- switchCount (Integer)
```

### Room Table
```sql
- id (Primary Key)
- roomNumber (Unique)
- capacity (Integer)
- status (Available/Occupied)
- yearGroup (Integer)
- gender (Male/Female)
- hostelName (String)
```

### Allotment Table
```sql
- id (Primary Key)
- studentId (Foreign Key → User)
- roomId (Foreign Key → Room)
- dateOfAllotment (DateTime)
- status (pending/approved/rejected)
```

## 🌐 API Endpoints

### Authentication
- `POST /auth/signup` - Register new user
- `POST /auth/login` - User login
- `GET /auth/my-profile` - Get current user profile
- `PUT /auth/profile` - Update user profile

### Student APIs
- `GET /rooms/all` - List available rooms
- `POST /allotment/apply/:roomId` - Apply for room (2nd+ year)
- `POST /allotment/random-allocate` - Random room allocation (1st year)
- `GET /allotment/my` - View my allotment

### Admin APIs
- `GET /admin/users` - Get all users
- `GET /admin/rooms` - Get all rooms with occupancy
- `GET /admin/allotments` - Get all allotments
- `POST /rooms/create` - Create new room
- `PUT /rooms/update/:id` - Update room details
- `DELETE /rooms/delete/:id` - Delete room
- `POST /auth/approve/:userId` - Approve user profile
- `POST /auth/disapprove/:userId` - Reject user profile
- `GET /auth/pending-profiles` - Get pending profile approvals

## 👥 Team Contributions

| Member | Module | Responsibility |
|--------|--------|----------------|
| **Ishita** | Authentication | User signup, login, JWT tokens |
| **Swarnim** | Room Management | CRUD operations for rooms |
| **Ansh** | Allotment System | Application processing |
| **Atharva** | Integration | Frontend, API integration, deployment |

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- PostgreSQL Database
- Git

### Local Development

1. **Clone Repository**
   ```bash
   git clone https://github.com/swarnim02/AP-PROJECT-.git
   cd AP-PROJECT-
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   npx prisma db push
   npm start
   ```

3. **Setup Frontend**
   ```bash
   cd frontend
   npm install
   npm start
   ```

4. **Environment Variables**
   Create `.env` in backend folder:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/hostel_db"
   JWT_SECRET="your_jwt_secret_key"
   PORT=5002
   ```

## 📝 Usage Guide

### For Students
1. **Register:** Create account with college email and basic details
2. **Login:** Access student dashboard
3. **Complete Profile:** Fill personal details, phone, address, guardian info
4. **Wait for Approval:** Admin reviews and approves profile
5. **Room Allocation:**
   - **1st Year:** Automatic random room allocation after approval
   - **2nd+ Year:** Browse and manually select from available rooms
6. **Track Status:** Monitor profile approval and room allocation progress

### For Admins
1. **Login:** Use admin credentials provided above
2. **Profile Management:** Review and approve/reject student profiles
3. **Room Management:** Create, update, delete rooms with capacity and gender settings
4. **User Monitoring:** View all students with their profile and room status
5. **System Overview:** Monitor room occupancy and allocation statistics

## 🔒 Security Features

- **Password Hashing:** bcrypt encryption
- **JWT Authentication:** Secure token-based auth
- **CORS Protection:** Cross-origin request security
- **Input Validation:** Server-side data validation
- **Role-based Access:** Admin/student permissions

## 📱 Responsive Design

- **Desktop:** Full sidebar navigation
- **Tablet:** Collapsible sidebar
- **Mobile:** Bottom navigation tabs
- **All devices:** Touch-friendly interfaces

## 🚀 Deployment

The application is deployed on Render:
- **Frontend:** Static site deployment
- **Backend:** Web service deployment
- **Database:** PostgreSQL database

## 📞 Support

For any issues or questions:
- **Email:** support@hostelsystem.com
- **GitHub:** [Repository Issues](https://github.com/swarnim02/AP-PROJECT-/issues)

---

**© 2024 Hostel Room Allotment System - Built by Team Devs**