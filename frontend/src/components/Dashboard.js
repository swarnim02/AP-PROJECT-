import { Link, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

function Sidebar({ activeTab, setActiveTab }) {
  const menuItems = [
    { id: 'overview', label: 'Dashboard', path: '/dashboard' },
    { id: 'rooms', label: 'Available Rooms', path: '/dashboard/rooms' },
    { id: 'status', label: 'My Application', path: '/dashboard/status' },
    { id: 'profile', label: 'Profile', path: '/dashboard/profile' }
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3>Student Portal</h3>
      </div>
      <nav className="sidebar-nav">
        {menuItems.map(item => (
          <button
            key={item.id}
            className={`sidebar-item ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => setActiveTab(item.id)}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </div>
  );
}

function Overview() {
  return (
    <div className="content-page">
      <div className="content-header">
        <h2>Dashboard Overview</h2>
        <p>Welcome to your hostel management portal</p>
      </div>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Available Rooms</h3>
          <div className="stat-number">25</div>
        </div>
        <div className="stat-card">
          <h3>My Applications</h3>
          <div className="stat-number">1</div>
        </div>
        <div className="stat-card">
          <h3>Status</h3>
          <div className="stat-status">Pending</div>
        </div>
      </div>
      
      <div className="recent-activity">
        <h3>Recent Activity</h3>
        <div className="activity-list">
          <div className="activity-item">Applied for Room R101</div>
          <div className="activity-item">Profile updated</div>
        </div>
      </div>
    </div>
  );
}

function RoomList() {
  return (
    <div className="content-page">
      <div className="content-header">
        <h2>Available Rooms</h2>
        <p>Browse and apply for available rooms</p>
      </div>
      
      <div className="room-grid">
        <div className="room-card">
          <h4>Room R101</h4>
          <p>Capacity: 2 students</p>
          <p>Year Group: 2nd Year</p>
          <button className="apply-btn">Apply Now</button>
        </div>
        <div className="room-card">
          <h4>Room R102</h4>
          <p>Capacity: 3 students</p>
          <p>Year Group: 2nd Year</p>
          <button className="apply-btn">Apply Now</button>
        </div>
      </div>
    </div>
  );
}

function ApplicationStatus() {
  return (
    <div className="content-page">
      <div className="content-header">
        <h2>My Application Status</h2>
        <p>Track your room application progress</p>
      </div>
      
      <div className="status-card">
        <h4>Current Application</h4>
        <p><strong>Room:</strong> R101</p>
        <p><strong>Status:</strong> <span className="status-pending">Pending</span></p>
        <p><strong>Applied:</strong> 2024-01-15</p>
        <button className="cancel-btn">Cancel Application</button>
      </div>
    </div>
  );
}

function Profile() {
  return (
    <div className="content-page">
      <div className="content-header">
        <h2>Profile Settings</h2>
        <p>Manage your account information</p>
      </div>
      
      <div className="profile-form">
        <div className="form-group">
          <label>Full Name</label>
          <input type="text" defaultValue="Student Name" />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" defaultValue="student@example.com" />
        </div>
        <div className="form-group">
          <label>College</label>
          <input type="text" defaultValue="ABC College" />
        </div>
        <button className="update-btn">Update Profile</button>
      </div>
    </div>
  );
}

function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  const renderContent = () => {
    switch(activeTab) {
      case 'rooms': return <RoomList />;
      case 'status': return <ApplicationStatus />;
      case 'profile': return <Profile />;
      default: return <Overview />;
    }
  };

  return (
    <div className="dashboard-layout">
      <header className="dashboard-header">
        <h1>Hostel Management System</h1>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </header>
      
      <div className="dashboard-body">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="dashboard-main">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;