# 🏠 Hostel Room Allotment System

A comprehensive full-stack web application for managing hostel room allocations with separate student and admin portals.

## 🚀 Project Overview

**Team:** Devs  
**Tech Stack:** Node.js + Express + React + Prisma + MySQL  
**Architecture:** Full-stack web application with REST API

## 📁 Project Structure

```
AP-PROJECT-/
├── backend/                 # Node.js + Express API
│   ├── src/
│   │   ├── modules/
│   │   │   ├── auth/        # Authentication (Ishita)
│   │   │   ├── rooms/       # Room Management (Swarnim)
│   │   │   ├── allotments/  # Allotment System (Ansh)
│   │   │   └── admin/       # Admin Panel (Core)
│   │   ├── middleware/      # JWT Authentication
│   │   └── app.js           # Express App
│   ├── prisma/              # Database Schema
│   └── server.js            # Server Entry Point
│
├── frontend/                # React Application
│   ├── src/
│   │   ├── components/      # React Components
│   │   ├── services/        # API Integration
│   │   └── App.js           # Main App
│   └── public/              # Static Assets
│
└── docs/                    # Documentation
```

## 🛠️ Tech Stack

### Backend
- **Framework:** Node.js + Express.js
- **Database:** MySQL with Prisma ORM
- **Authentication:** JWT (JSON Web Tokens)
- **API:** RESTful endpoints
- **Port:** 5002

### Frontend
- **Framework:** React 18
- **Routing:** React Router DOM
- **Styling:** Pure CSS (Black & White Theme)
- **HTTP Client:** Fetch API
- **Port:** 5174
## ER Diagram
![ER-Diagram](https://ibb.co/FLbVLcnR "ER-Diagram")
## 🔧 Installation & Setup

### Prerequisites
- Node.js (v16+)
- MySQL Database
- Git

### Backend Setup
```bash
cd backend
npm install
npx prisma db push
npm start
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

### Environment Variables
Create `.env` in backend folder:
```env
DATABASE_URL="mysql://username:password@localhost:3306/hostel_room_allotment"
JWT_SECRET="your_jwt_secret_key"
PORT=5002
```

## 🎯 Features

### 🔐 Authentication System
- Student registration and login
- JWT-based authentication
- Role-based access control
- Secure password hashing

### 👨🎓 Student Portal
- **Dashboard:** Overview with statistics
- **Room Browsing:** View available rooms
- **Application System:** Apply for rooms
- **Status Tracking:** Monitor application progress
- **Profile Management:** Update personal information

### 👨💼 Admin Panel
- **Room Management:** CRUD operations for rooms
- **Application Review:** Approve/reject student applications
- **User Management:** View all registered students
- **System Overview:** Monitor all allotments

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
```

### Room Table
```sql
- id (Primary Key)
- roomNumber (Unique)
- capacity (Integer)
- status (Available/Occupied)
- yearGroup (Integer)
```

### Allotment Table
```sql
- id (Primary Key)
- studentId (Foreign Key → User)
- roomId (Foreign Key → Room)
- dateOfAllotment (DateTime)
```

## 🌐 API Endpoints

### Authentication
- `POST /auth/signup` - Register new user
- `POST /auth/login` - User login

### Student APIs
- `GET /rooms/all` - List available rooms
- `POST /allotment/apply/:roomId` - Apply for room
- `GET /allotment/my` - View my allotment

### Admin APIs
- `POST /rooms/create` - Create new room
- `PUT /rooms/update/:id` - Update room details
- `DELETE /rooms/delete/:id` - Delete room
- `GET /allotment/all` - View all allotments
- `POST /allotment/approve/:studentId` - Approve allotment

## 👥 Team Contributions

| Member | Module | Responsibility |
|--------|--------|----------------|
| **Ishita** | Authentication | User signup, login, JWT tokens |
| **Swarnim** | Room Management | CRUD operations for rooms |
| **Ansh** | Allotment System | Application processing |
| **Core Team** | Integration | Frontend, API integration, deployment |

## 🚀 Getting Started

1. **Clone Repository**
   ```bash
   git clone <repository-url>
   cd AP-PROJECT-
   ```

2. **Setup Database**
   - Create MySQL database
   - Update connection string in `.env`

3. **Start Backend**
   ```bash
   cd backend
   npm install
   npx prisma db push
   npm start
   ```

4. **Start Frontend**
   ```bash
   cd frontend
   npm install
   npm start
   ```

5. **Access Application**
   - Frontend: http://localhost:5174
   - Backend API: http://localhost:5002

## 📝 Usage Guide

### For Students
1. Register with college email
2. Login to access dashboard
3. Browse available rooms
4. Apply for preferred room
5. Track application status

### For Admins
1. Login with admin credentials
2. Manage room inventory
3. Review student applications
4. Approve/reject allotments
5. Monitor system usage

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

---

**Built with ❤️ by Team Devs**
