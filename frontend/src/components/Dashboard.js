import { Link } from 'react-router-dom';

function Dashboard() {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Student Dashboard</h1>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </header>
      
      <main className="dashboard-main">
        <div className="dashboard-content">
          <h2>Welcome to Hostel Management System</h2>
          <p>Manage your room applications and view allotments</p>
          
          <div className="dashboard-actions">
            <Link to="/rooms" className="dashboard-btn">View Available Rooms</Link>
            <Link to="/my-allotment" className="dashboard-btn">My Allotment</Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;