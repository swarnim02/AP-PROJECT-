import { useState, useEffect } from 'react';
import LoadingSpinner from './LoadingSpinner';

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [allotments, setAllotments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('students');

  useEffect(() => {
    fetchData();
  }, []);

  const handleRefresh = () => {
    setLoading(true);
    fetchData();
  };

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log('Fetching users data...');
      
      // Fetch users
      const usersResponse = await fetch('https://ap-project-v67b.onrender.com/admin/users', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      console.log('Users response status:', usersResponse.status);
      
      if (!usersResponse.ok) {
        throw new Error(`HTTP error! status: ${usersResponse.status}`);
      }
      
      const usersData = await usersResponse.json();
      console.log('Users data received:', usersData);
      setUsers(usersData.users || []);

      // Fetch allotments
      const allotmentsResponse = await fetch('https://ap-project-v67b.onrender.com/admin/allotments', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (allotmentsResponse.ok) {
        const allotmentsData = await allotmentsResponse.json();
        setAllotments(allotmentsData.allotments || []);
      }
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  };

  const getStudentRoom = (studentId) => {
    const allotment = allotments.find(a => a.studentId === studentId && a.status === 'approved');
    return allotment ? allotment.room?.roomNumber : 'Not Allocated';
  };

  const getProfileStatus = (user) => {
    console.log(`User ${user.name} - profileApproved:`, user.profileApproved, typeof user.profileApproved);
    console.log(`User ${user.name} - phone:`, user.phone, 'address:', user.address, 'guardian:', user.guardianName);
    
    // Check profileApproved status directly
    if (user.profileApproved === true) {
      return { text: 'Approved', class: 'approved' };
    }
    
    if (user.profileApproved === null) {
      return { text: 'Pending', class: 'pending' };
    }
    
    if (user.profileApproved === false) {
      return { text: 'Rejected', class: 'rejected' };
    }
    
    // For users with no profileApproved value set, check profile completeness
    const hasCompleteProfile = user.phone && user.address && user.guardianName;
    if (hasCompleteProfile) {
      return { text: 'Pending', class: 'pending' };
    }
    
    return { text: 'Incomplete', class: 'incomplete' };
  };

  if (loading) return <LoadingSpinner message="Loading users..." />;

  const students = users.filter(user => user.role === 'student');
  const admins = users.filter(user => user.role === 'admin');
  


  return (
    <div className="content-page">
      <div className="content-header">
        <h2>User Management</h2>
        <button onClick={handleRefresh} className="update-btn" style={{marginBottom: '10px'}}>
          Refresh Data
        </button>
        <div className="tab-buttons">
          <button 
            className={`tab-btn ${activeTab === 'students' ? 'active' : ''}`}
            onClick={() => setActiveTab('students')}
          >
            Students ({students.length})
          </button>
          <button 
            className={`tab-btn ${activeTab === 'admins' ? 'active' : ''}`}
            onClick={() => setActiveTab('admins')}
          >
            Admins ({admins.length})
          </button>
        </div>
      </div>

      {activeTab === 'students' && (
        <div className="users-table">
          <div className="table-header">
            <div>Name</div>
            <div>Email</div>
            <div>Year</div>
            <div>Gender</div>
            <div>Profile</div>
            <div>Room</div>
          </div>
          
          {students.length === 0 ? (
            <div className="no-data">No students found</div>
          ) : (
            students.map(user => {
              const profileStatus = getProfileStatus(user);
              const roomStatus = getStudentRoom(user.id);
              
              return (
                <div key={user.id} className="table-row">
                  <div>{user.name}</div>
                  <div>{user.email}</div>
                  <div>{user.year || 'N/A'}</div>
                  <div>{user.gender || 'N/A'}</div>
                  <div>
                    <span className={`status-badge status-${profileStatus.class}`}>
                      {profileStatus.text}
                    </span>
                  </div>
                  <div>
                    <span className={roomStatus === 'Not Allocated' ? 'room-not-allocated' : 'room-allocated'}>
                      {roomStatus}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {activeTab === 'admins' && (
        <div className="users-table">
          <div className="table-header-admin">
            <div>Name</div>
            <div>Email</div>
            <div>Role</div>
          </div>
          
          {admins.length === 0 ? (
            <div className="no-data">No admins found</div>
          ) : (
            admins.map(user => (
              <div key={user.id} className="table-row-admin">
                <div>{user.name}</div>
                <div>{user.email}</div>
                <div className="role-badge">{user.role}</div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default UserManagement;