# 🏗️ Project Structure

## Overview
Full-stack Hostel Room Allotment System with organized backend and frontend.

```
AP-PROJECT-/
├── backend/                 # Node.js + Express + Prisma + MySQL
│   ├── src/
│   │   ├── modules/
│   │   │   ├── auth/        # Ishita's authentication module
│   │   │   ├── rooms/       # Swarnim's room management
│   │   │   ├── allotments/  # Ansh's allotment system
│   │   │   └── admin/       # Core admin functionality
│   │   ├── middleware/      # JWT authentication
│   │   ├── config/          # Database configuration
│   │   └── app.js           # Express app setup
│   ├── prisma/              # Database schema & migrations
│   ├── docs/                # API documentation
│   ├── tests/               # Backend tests
│   ├── .env                 # Environment variables
│   ├── package.json         # Backend dependencies
│   └── server.js            # Server entry point
│
├── frontend/                # React application
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── services/        # API integration
│   │   ├── App.js           # Main app component
│   │   └── App.css          # Styling
│   ├── public/              # Static assets
│   └── package.json         # Frontend dependencies
│
├── README.md                # Project documentation
└── FRONTEND_PLAN.md         # Frontend development plan
```

## 🚀 Quick Start

### Backend Setup
```bash
cd backend
npm install
npm start
# Server runs on http://localhost:5002
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
# App runs on http://localhost:3000
```

## 🔧 Development Workflow

### Backend Development
- **API endpoints:** `backend/docs/API_TESTING_GUIDE.md`
- **Database:** MySQL with Prisma ORM
- **Authentication:** JWT-based
- **Port:** 5002

### Frontend Development
- **Framework:** React with React Router
- **Styling:** Pure CSS (black & white theme)
- **API calls:** Fetch API
- **Port:** 3000

## 👥 Team Contributions

### Backend Modules
- **Ishita:** Authentication system (`src/modules/auth/`)
- **Swarnim:** Room management (`src/modules/rooms/`)
- **Ansh:** Allotment system (`src/modules/allotments/`)
- **Core Team:** Admin panel (`src/modules/admin/`)

### Frontend Components
- **Authentication:** Login/Register pages
- **Dashboard:** Student portal
- **Room Management:** Browse and apply for rooms
- **Admin Panel:** Management interface

## 📊 Current Status
- ✅ Backend API fully functional
- ✅ Database schema implemented
- ✅ Authentication system working
- ✅ Frontend basic structure ready
- 🔄 Student features in development
- ⏳ Admin panel pending

## 🎯 Next Steps
1. Complete student room management features
2. Build admin panel interface
3. Add real-time updates
4. Implement role-based routing
5. Add comprehensive error handling