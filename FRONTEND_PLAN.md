# 🎨 Basic React Frontend Plan

## Project Structure
```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Auth/
│   │   │   ├── Login.js
│   │   │   └── Signup.js
│   │   ├── Student/
│   │   │   ├── RoomList.js
│   │   │   ├── ApplyRoom.js
│   │   │   └── MyAllotment.js
│   │   ├── Admin/
│   │   │   ├── Dashboard.js
│   │   │   ├── ManageRooms.js
│   │   │   ├── ManageAllotments.js
│   │   │   └── ViewUsers.js
│   │   └── Layout/
│   │       ├── Header.js
│   │       └── Navigation.js
│   ├── services/
│   │   └── api.js
│   ├── utils/
│   │   └── auth.js
│   ├── App.js
│   └── index.js
├── package.json
└── README.md
```

## 📱 Pages & Components

### **1. Authentication Pages**
- **Login Page** - Email/password form
- **Signup Page** - Student registration form
- **Role-based routing** (Student/Admin)

### **2. Student Dashboard**
- **Room List** - View available rooms
- **Apply for Room** - Submit room application
- **My Allotment** - View assigned room details

### **3. Admin Dashboard**
- **Manage Rooms** - CRUD operations for rooms
- **Manage Allotments** - Approve/reject applications
- **View Users** - List all students
- **View All Allotments** - System overview

## 🔧 Technical Setup

### **Dependencies**
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.8.0",
    "axios": "^1.3.0"
  }
}
```

### **API Integration**
- **Base URL:** `http://localhost:5002`
- **JWT Token** stored in localStorage
- **Axios interceptors** for authentication

## 📋 Component Details

### **App.js Structure**
```javascript
function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/student/*" element={<StudentDashboard />} />
        <Route path="/admin/*" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}
```

### **Student Routes**
- `/student/rooms` - View available rooms
- `/student/apply/:roomId` - Apply for specific room
- `/student/allotment` - View my allotment

### **Admin Routes**
- `/admin/dashboard` - Overview
- `/admin/rooms` - Manage rooms
- `/admin/allotments` - Manage allotments
- `/admin/users` - View users

## 🎯 Key Features

### **Authentication Flow**
1. Login/Signup forms
2. JWT token storage
3. Role-based redirects
4. Protected routes

### **Student Features**
- View available rooms (table format)
- Apply for room (button click)
- View allotment status
- Basic room details display

### **Admin Features**
- Create/Edit/Delete rooms
- Approve/Reject allotments
- View all users and allotments
- Simple forms and tables

## 📝 Implementation Steps

### **Phase 1: Setup (30 mins)**
1. Create React app
2. Install dependencies
3. Setup routing
4. Create basic components

### **Phase 2: Authentication (45 mins)**
1. Login/Signup forms
2. API integration
3. Token management
4. Protected routes

### **Phase 3: Student Features (60 mins)**
1. Room listing component
2. Apply for room functionality
3. View allotment component
4. Basic styling/alignment

### **Phase 4: Admin Features (60 mins)**
1. Room management (CRUD)
2. Allotment management
3. User listing
4. Dashboard overview

### **Phase 5: Integration & Testing (30 mins)**
1. Connect all components
2. Test API calls
3. Fix routing issues
4. Basic error handling

## 🎨 Basic Styling Approach

### **No CSS Framework - Just Basic Styling**
- **Flexbox** for layouts
- **Basic margins/padding** for spacing
- **Simple borders** for forms/tables
- **Basic colors** for status indicators
- **Responsive** using CSS Grid/Flexbox

### **Sample Component Style**
```css
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 400px;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.table th, .table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}
```

## 🔗 API Integration Points

### **Authentication**
- `POST /auth/login`
- `POST /auth/signup`

### **Student APIs**
- `GET /rooms/all` - List rooms
- `POST /allotment/apply/:roomId` - Apply
- `GET /allotment/my` - My allotment

### **Admin APIs**
- `POST /rooms/create` - Create room
- `PUT /rooms/update/:id` - Update room
- `DELETE /rooms/delete/:id` - Delete room
- `GET /allotment/all` - All allotments
- `POST /allotment/approve/:studentId` - Approve

## 🚀 Quick Start Commands

```bash
# Create React app
npx create-react-app frontend
cd frontend

# Install dependencies
npm install react-router-dom axios

# Start development server
npm start
```

## 📊 Expected Timeline
- **Total Time:** ~4 hours
- **Basic functionality:** 3 hours
- **Testing & fixes:** 1 hour

## 🎯 Success Criteria
- ✅ User can login/signup
- ✅ Students can view and apply for rooms
- ✅ Students can see their allotment
- ✅ Admins can manage rooms
- ✅ Admins can approve allotments
- ✅ Basic responsive layout
- ✅ Error handling for API calls

**This plan creates a functional, no-frills frontend that covers all backend features with basic React components and minimal styling.**