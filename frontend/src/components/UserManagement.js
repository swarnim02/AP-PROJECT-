import { useState, useEffect } from 'react';
import LoadingSpinner from './LoadingSpinner';

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5002/admin/users', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setUsers(data.users || []);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
    setLoading(false);
  };

  if (loading) return <LoadingSpinner message="Loading users..." />;

  return (
    <div className="content-page">
      <div className="content-header">
        <h2>User Management</h2>
        <p>View all registered students</p>
      </div>

      <div className="users-table">
        <div className="table-header">
          <div>Name</div>
          <div>Email</div>
          <div>College</div>
          <div>Year</div>
          <div>Role</div>
        </div>
        
        {users.length === 0 ? (
          <div className="no-data">No users found</div>
        ) : (
          users.map(user => (
            <div key={user.id} className="table-row">
              <div>{user.name}</div>
              <div>{user.email}</div>
              <div>{user.college}</div>
              <div>{user.year}</div>
              <div className="role-badge">{user.role}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default UserManagement;