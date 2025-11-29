function AdminSidebar({ activeTab, setActiveTab }) {
  const menuItems = [
    { id: 'overview', label: 'Dashboard' },
    { id: 'rooms', label: 'Room Management' },
    { id: 'applications', label: 'Applications' },
    { id: 'users', label: 'User Management' }
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3>Admin Panel</h3>
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

export default AdminSidebar;