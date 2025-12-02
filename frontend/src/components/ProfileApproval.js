import { useState, useEffect } from 'react';
import { showNotification } from './Notification';

function ProfileApproval() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPendingProfiles();
  }, []);

  const fetchPendingProfiles = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://ap-project-v67b.onrender.com/auth/pending-profiles', {
        headers: { 
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setProfiles(data.profiles || []);
    } catch (error) {
      console.error('Error fetching profiles:', error);
    }
    setLoading(false);
  };

  const handleApprove = async (userId) => {
    try {
      console.log('Approving user ID:', userId);
      const token = localStorage.getItem('token');
      const response = await fetch(`https://ap-project-v67b.onrender.com/auth/approve-profile/${userId}`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      const data = await response.json();
      console.log('Approval response:', data);
      
      if (response.ok) {
        showNotification('Profile approved successfully!', 'success');
        fetchPendingProfiles();
      } else {
        console.error('Approval failed:', data);
        showNotification(data.message || 'Error approving profile', 'error');
      }
    } catch (error) {
      console.error('Approval error:', error);
      showNotification('Error approving profile', 'error');
    }
  };

  const handleDisapprove = async (userId) => {
    if (!window.confirm('Are you sure you want to disapprove this profile?')) return;
    
    try {
      console.log('Disapproving user ID:', userId);
      const token = localStorage.getItem('token');
      const response = await fetch(`https://ap-project-v67b.onrender.com/auth/disapprove-profile/${userId}`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      const data = await response.json();
      console.log('Disapproval response:', data);
      
      if (response.ok) {
        showNotification('Profile disapproved', 'info');
        fetchPendingProfiles();
      } else {
        console.error('Disapproval failed:', data);
        showNotification(data.message || 'Error disapproving profile', 'error');
      }
    } catch (error) {
      console.error('Disapproval error:', error);
      showNotification('Error disapproving profile', 'error');
    }
  };

  if (loading) {
    return (
      <div className="content-page">
        <div className="content-header">
          <h2>Profile Approval</h2>
          <p>Loading pending profiles...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="content-page">
      <div className="content-header">
        <h2>Profile Approval</h2>
        <p>Review and approve student profiles</p>
      </div>

      <div className="profiles-list">
        {profiles.length === 0 ? (
          <div className="no-data">No pending profiles found</div>
        ) : (
          profiles.map(profile => (
            <div key={profile.id} className="profile-card">
              <div className="profile-info">
                <h4>{profile.name}</h4>
                <div className="profile-details">
                  <p><strong>Email:</strong> {profile.email}</p>
                  <p><strong>College:</strong> {profile.college}</p>
                  <p><strong>Year:</strong> {profile.year}</p>
                  <p><strong>Gender:</strong> {profile.gender}</p>
                  <p><strong>Phone:</strong> {profile.phone}</p>
                  <p><strong>Address:</strong> {profile.address}</p>
                  <p><strong>Guardian:</strong> {profile.guardianName}</p>
                  <p><strong>Guardian Phone:</strong> {profile.guardianPhone}</p>
                </div>
              </div>
              
              <div className="profile-actions">
                <button 
                  className="approve-btn"
                  onClick={() => handleApprove(profile.id)}
                >
                  Approve
                </button>
                <button 
                  className="reject-btn"
                  onClick={() => handleDisapprove(profile.id)}
                >
                  Disapprove
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ProfileApproval;