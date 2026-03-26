import { useState, useEffect } from 'react';
import { showNotification } from './Notification';

function ProfileForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    college: '',
    year: '',
    phone: '',
    address: '',
    guardianName: '',
    guardianPhone: ''
  });
  const [loading, setLoading] = useState(false);
  const [profileStatus, setProfileStatus] = useState(null);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const payload = JSON.parse(atob(token.split('.')[1]));
      
      // Set basic data from token
      setFormData(prev => ({
        ...prev,
        name: payload.name || '',
        email: payload.email || '',
        year: payload.year?.toString() || ''
      }));
      
      // Get full user data using correct endpoint
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5002'}/auth/my-profile`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        const currentUser = data.user;
        
        if (currentUser) {
          setFormData({
            name: currentUser.name || '',
            email: currentUser.email || '',
            college: currentUser.college || '',
            year: currentUser.year?.toString() || '',
            phone: currentUser.phone || '',
            address: currentUser.address || '',
            guardianName: currentUser.guardianName || '',
            guardianPhone: currentUser.guardianPhone || ''
          });
          
          // Determine profile status
          const isComplete = currentUser.phone && currentUser.address && currentUser.guardianName;
          
          if (currentUser.profileApproved === true) {
            setProfileStatus('approved');
          } else if (currentUser.profileApproved === null && isComplete) {
            setProfileStatus('pending');
          } else if (currentUser.profileApproved === false) {
            setProfileStatus('rejected');
          } else {
            setProfileStatus('incomplete');
          }
        }
      } catch (error) {
        console.log('Could not fetch full user data, using token data');
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5002'}/auth/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      
      if (response.ok) {
        showNotification('Profile submitted for approval!', 'success');
        setProfileStatus('pending');
      } else {
        console.error('Profile update error:', data);
        showNotification(data.message || 'Error updating profile', 'error');
      }
    } catch (error) {
      console.error('Profile update error:', error);
      showNotification('Error updating profile', 'error');
    }
    setLoading(false);
  };

  const getStatusDisplay = () => {
    switch(profileStatus) {
      case 'approved':
        return {
          icon: '',
          title: 'Profile Approved',
          message: 'Your profile has been approved! You can now apply for rooms.',
          className: 'profile-status-approved'
        };
      case 'pending':
        return {
          icon: '',
          title: 'Profile Under Review',
          message: 'Your profile is submitted and waiting for admin approval.',
          className: 'profile-status-pending'
        };
      case 'rejected':
        return {
          icon: '',
          title: 'Profile Rejected',
          message: 'Your profile was rejected. Please update your information and resubmit.',
          className: 'profile-status-rejected'
        };
      default:
        return null;
    }
  };

  const statusDisplay = getStatusDisplay();



  return (
    <div className="content-page">
      <div className="content-header">
        <h2>Complete Your Profile</h2>
        <p>Fill in all details for profile approval</p>
      </div>

      {statusDisplay && (
        <div className={statusDisplay.className}>
          <h3>{statusDisplay.title}</h3>
          <p>{statusDisplay.message}</p>
        </div>
      )}

      <form className="profile-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled
          />
        </div>

        <div className="form-group">
          <label>College *</label>
          <input
            type="text"
            name="college"
            value={formData.college}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Year *</label>
          <select
            name="year"
            value={formData.year}
            onChange={handleChange}
            required
          >
            <option value="">Select Year</option>
            <option value="1">1st Year</option>
            <option value="2">2nd Year</option>
            <option value="3">3rd Year</option>
            <option value="4">4th Year</option>
          </select>
        </div>

        <div className="form-group">
          <label>Phone Number *</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Address *</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            rows="3"
            required
          />
        </div>

        <div className="form-group">
          <label>Guardian Name *</label>
          <input
            type="text"
            name="guardianName"
            value={formData.guardianName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Guardian Phone *</label>
          <input
            type="tel"
            name="guardianPhone"
            value={formData.guardianPhone}
            onChange={handleChange}
            required
          />
        </div>

        <button 
          type="submit" 
          className="submit-btn" 
          disabled={loading || profileStatus === 'pending'}
        >
          {loading ? 'Submitting...' : 
           profileStatus === 'pending' ? 'Under Review' :
           profileStatus === 'rejected' ? 'Resubmit for Approval' :
           profileStatus === 'approved' ? 'Update Profile' :
           'Submit for Approval'}
        </button>
      </form>
    </div>
  );
}

export default ProfileForm;