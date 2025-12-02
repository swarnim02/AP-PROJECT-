import { useState, useEffect } from 'react';
import AdminSidebar from './AdminSidebar';
import RoomManagement from './RoomManagement';
import UserManagement from './UserManagement';
import ProfileApproval from './ProfileApproval';

function AdminOverview() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalRooms: 0,
    availableRooms: 0,
    pendingApplications: 0,
    approvedApplications: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://ap-project-v67b.onrender.com/admin/dashboard-stats', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="content-page">
        <div className="content-header">
          <h2>Admin Dashboard</h2>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="content-page">
      <div className="content-header">
        <h2>Admin Dashboard</h2>
        <p>System overview and management</p>
      </div>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Rooms</h3>
          <div className="stat-number">{stats.totalRooms}</div>
        </div>
        <div className="stat-card">
          <h3>Available Rooms</h3>
          <div className="stat-number">{stats.availableRooms}</div>
        </div>
        <div className="stat-card">
          <h3>Total Students</h3>
          <div className="stat-number">{stats.totalUsers}</div>
        </div>
        <div className="stat-card">
          <h3>Pending Applications</h3>
          <div className="stat-number">{stats.pendingApplications}</div>
        </div>
        <div className="stat-card">
          <h3>Approved Applications</h3>
          <div className="stat-number">{stats.approvedApplications}</div>
        </div>
      </div>
      
      <div className="recent-activity">
        <h3>System Status</h3>
        <div className="activity-list">
          <div className="activity-item">Total registered students: {stats.totalUsers}</div>
          <div className="activity-item">Rooms available for allocation: {stats.availableRooms}</div>
          <div className="activity-item">Applications awaiting approval: {stats.pendingApplications}</div>
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
      case 'users': return <UserManagement />;
      case 'profiles': return <ProfileApproval />;
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