import { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import RoomManagement from './RoomManagement';
import ApplicationReview from './ApplicationReview';
import UserManagement from './UserManagement';

function AdminOverview() {
  return (
    <div className="content-page">
      <div className="content-header">
        <h2>Admin Dashboard</h2>
        <p>System overview and management</p>
      </div>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Rooms</h3>
          <div className="stat-number">50</div>
        </div>
        <div className="stat-card">
          <h3>Available Rooms</h3>
          <div className="stat-number">25</div>
        </div>
        <div className="stat-card">
          <h3>Total Students</h3>
          <div className="stat-number">120</div>
        </div>
        <div className="stat-card">
          <h3>Pending Applications</h3>
          <div className="stat-number">8</div>
        </div>
      </div>
      
      <div className="recent-activity">
        <h3>Recent Activity</h3>
        <div className="activity-list">
          <div className="activity-item">New room application from John Doe</div>
          <div className="activity-item">Room R101 marked as occupied</div>
          <div className="activity-item">Student profile updated</div>
        </div>
      </div>
    </div>
  );
}

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  const renderContent = () => {
    switch(activeTab) {
      case 'rooms': return <RoomManagement />;
      case 'applications': return <ApplicationReview />;
      case 'users': return <UserManagement />;
      default: return <AdminOverview />;
    }
  };

  return (
    <div className="dashboard-layout">
      <header className="dashboard-header">
        <h1>Admin Panel - Hostel Management</h1>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </header>
      
      <div className="dashboard-body">
        <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="dashboard-main">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;