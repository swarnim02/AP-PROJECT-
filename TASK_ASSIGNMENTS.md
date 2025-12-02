# 🎯 Task Assignments - Hostel Room Allotment System

## 📋 **TASK 1: Profile Management System** 
**Assigned to: ANSH**

### **What to Build:**
Create a complete profile management system for students to update their information.

### **Step-by-Step Implementation Guide:**

#### **Step 1: Pull Latest Code**
```bash
# Navigate to project directory
cd AP-PROJECT-

# Force pull latest changes
git fetch origin
git reset --hard origin/main
git pull origin main

# Check current status
git status
```

#### **Step 2: Create Backend Profile API**
**File:** `backend/src/modules/auth/controllers/authController.js`

Add this function:
```javascript
const updateProfile = async (req, res) => {
  try {
    const { name, college, year } = req.body;
    const userId = req.user.id;

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { name, college, year: parseInt(year) },
      select: { id: true, name: true, email: true, college: true, year: true, role: true }
    });

    res.json({ 
      success: true, 
      message: 'Profile updated successfully',
      user: updatedUser 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error updating profile' 
    });
  }
};

module.exports = { signup, login, updateProfile };
```

#### **Step 3: Add Profile Route**
**File:** `backend/src/modules/auth/routes/authRoutes.js`

Add this line:
```javascript
router.put('/profile', auth, updateProfile);
```

#### **Step 4: Create Frontend Profile Component**
**File:** `frontend/src/components/ProfileEditor.js`

```javascript
import { useState, useEffect } from 'react';
import LoadingSpinner from './LoadingSpinner';

function ProfileEditor() {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    college: '',
    year: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // Get user data from token
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setProfile({
        name: payload.name || '',
        email: payload.email || '',
        college: payload.college || '',
        year: payload.year?.toString() || ''
      });
    }
    setLoading(false);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5002/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: profile.name,
          college: profile.college,
          year: parseInt(profile.year)
        })
      });
      
      const data = await response.json();
      if (data.success) {
        alert('Profile updated successfully!');
      } else {
        alert('Error updating profile');
      }
    } catch (error) {
      alert('Network error');
    }
    setSaving(false);
  };

  if (loading) return <LoadingSpinner message="Loading profile..." />;

  return (
    <div className="content-page">
      <div className="content-header">
        <h2>Profile Settings</h2>
        <p>Manage your account information</p>
      </div>
      
      <form onSubmit={handleSubmit} className="profile-form">
        <div className="form-group">
          <label>Full Name</label>
          <input 
            type="text" 
            value={profile.name}
            onChange={(e) => setProfile({...profile, name: e.target.value})}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Email (Read Only)</label>
          <input 
            type="email" 
            value={profile.email}
            disabled
          />
        </div>
        
        <div className="form-group">
          <label>College</label>
          <input 
            type="text" 
            value={profile.college}
            onChange={(e) => setProfile({...profile, college: e.target.value})}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Year</label>
          <select 
            value={profile.year}
            onChange={(e) => setProfile({...profile, year: e.target.value})}
            required
          >
            <option value="">Select Year</option>
            <option value="1">1st Year</option>
            <option value="2">2nd Year</option>
            <option value="3">3rd Year</option>
            <option value="4">4th Year</option>
          </select>
        </div>
        
        <button type="submit" className="update-btn" disabled={saving}>
          {saving ? 'Updating...' : 'Update Profile'}
        </button>
      </form>
    </div>
  );
}

export default ProfileEditor;
```

#### **Step 5: Update Dashboard to Use ProfileEditor**
**File:** `frontend/src/components/Dashboard.js`

Replace the Profile function with:
```javascript
import ProfileEditor from './ProfileEditor';

// In the renderContent function, change:
case 'profile': return <ProfileEditor />;
```

#### **Step 6: Test and Commit**
```bash
# Test the functionality
npm start

# Add files to git
git add .

# Commit with your name
git config user.name "ansh"
git config user.email "ansh@example.com"
git commit -m "feat: add profile management system

- Create updateProfile API endpoint
- Add profile update route
- Create functional ProfileEditor component
- Connect profile editing to backend API"

# Push changes
git push origin main
```

---

## 📋 **TASK 2: Notification System & Error Handling**
**Assigned to: SWARNIM**

### **What to Build:**
Create a notification system for success/error messages and improve error handling across the app.

### **Step-by-Step Implementation Guide:**

#### **Step 1: Pull Latest Code**
```bash
# Navigate to project directory
cd AP-PROJECT-

# Force pull latest changes
git fetch origin
git reset --hard origin/main
git pull origin main

# Check current status
git status
```

#### **Step 2: Create Notification Component**
**File:** `frontend/src/components/Notification.js`

```javascript
import { useState, useEffect } from 'react';

let showNotificationGlobal = null;

function Notification() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    showNotificationGlobal = (message, type = 'info') => {
      const id = Date.now();
      const notification = { id, message, type };
      
      setNotifications(prev => [...prev, notification]);
      
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== id));
      }, 4000);
    };
  }, []);

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div className="notification-container">
      {notifications.map(notification => (
        <div 
          key={notification.id}
          className={`notification notification-${notification.type}`}
          onClick={() => removeNotification(notification.id)}
        >
          {notification.message}
          <button className="notification-close">×</button>
        </div>
      ))}
    </div>
  );
}

export const showNotification = (message, type) => {
  if (showNotificationGlobal) {
    showNotificationGlobal(message, type);
  }
};

export default Notification;
```

#### **Step 3: Add Notification CSS**
**File:** `frontend/src/App.css`

Add at the end:
```css
/* Notification Styles */
.notification-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.notification {
  padding: 12px 16px;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 300px;
  animation: slideIn 0.3s ease-out;
}

.notification-success {
  background: #2f855a;
}

.notification-error {
  background: #c53030;
}

.notification-info {
  background: #333;
}

.notification-close {
  background: none;
  border: none;
  color: #fff;
  font-size: 18px;
  cursor: pointer;
  margin-left: 10px;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
```

#### **Step 4: Create Error Boundary Component**
**File:** `frontend/src/components/ErrorBoundary.js`

```javascript
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Something went wrong</h2>
          <p>Please refresh the page and try again.</p>
          <button 
            onClick={() => window.location.reload()}
            className="submit-btn"
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
```

#### **Step 5: Update App.js to Include Notifications**
**File:** `frontend/src/App.js`

Add imports:
```javascript
import Notification from './components/Notification';
import ErrorBoundary from './components/ErrorBoundary';
```

Wrap the Router in ErrorBoundary and add Notification:
```javascript
function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          {/* existing routes */}
        </Routes>
        <Notification />
      </Router>
    </ErrorBoundary>
  );
}
```

#### **Step 6: Update Dashboard Components to Use Notifications**
**File:** `frontend/src/components/Dashboard.js`

Add import:
```javascript
import { showNotification } from './Notification';
```

Update the handleApply function in RoomList:
```javascript
const handleApply = async (roomId) => {
  try {
    await api.applyForRoom(roomId);
    showNotification('Application submitted successfully!', 'success');
  } catch (error) {
    showNotification('Error applying for room. Please try again.', 'error');
  }
};
```

#### **Step 7: Add Better Error Handling to API Service**
**File:** `frontend/src/services/api.js`

Update each API function to handle errors better:
```javascript
async getRooms() {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/rooms/all`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  } catch (error) {
    console.error('Error fetching rooms:', error);
    throw error;
  }
}
```

#### **Step 8: Test and Commit**
```bash
# Test the functionality
npm start

# Add files to git
git add .

# Commit with your name
git config user.name "swarnim"
git config user.email "swarnim@example.com"
git commit -m "feat: add notification system and error handling

- Create Notification component with success/error/info types
- Add ErrorBoundary for crash protection
- Improve API error handling with better messages
- Add notification CSS with animations
- Integrate notifications into dashboard components"

# Push changes
git push origin main
```

---

## 🚀 **Final Steps for Both:**

### **Testing Checklist:**
- [ ] Backend server runs without errors
- [ ] Frontend compiles and loads
- [ ] Profile updates work (Ansh)
- [ ] Notifications show on actions (Swarnim)
- [ ] Error handling works properly
- [ ] All components load without crashes

### **Submission:**
1. Test your implementation thoroughly
2. Commit with descriptive messages
3. Push to main branch
4. Create a brief summary of what you implemented

### **Help & Support:**
- Check console for errors
- Test API endpoints in browser/Postman
- Verify database connections
- Ask for help if stuck on any step

**Deadline: Today (Complete by end of day)**