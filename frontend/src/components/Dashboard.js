import { Link, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { showNotification } from './Notification';
import ProfileForm from './ProfileForm';


function Sidebar({ activeTab, setActiveTab, userYear }) {
  const getMenuItems = () => {
    if (userYear === 1) {
      return [
        { id: 'overview', label: 'Dashboard', path: '/dashboard' },
        { id: 'rooms', label: 'Random Allocation', path: '/dashboard/rooms' },
        { id: 'status', label: 'My Application', path: '/dashboard/status' },

        { id: 'profile', label: 'Profile', path: '/dashboard/profile' }
      ];
    }
    return [
      { id: 'overview', label: 'Dashboard', path: '/dashboard' },
      { id: 'rooms', label: 'Available Rooms', path: '/dashboard/rooms' },
      { id: 'status', label: 'My Application', path: '/dashboard/status' },
      { id: 'switch', label: 'Room Switch', path: '/dashboard/switch' },
      { id: 'profile', label: 'Profile', path: '/dashboard/profile' }
    ];
  };
  
  const menuItems = getMenuItems();

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
  const [myAllotment, setMyAllotment] = useState(null);
  const [availableRooms, setAvailableRooms] = useState(0);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyData();
  }, []);

  const fetchMyData = async () => {
    try {
      const token = localStorage.getItem('token');
      
      // Fetch user profile
      try {
        const profileResponse = await fetch('https://ap-project-v67b.onrender.com/auth/my-profile', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (profileResponse.ok) {
          const profileData = await profileResponse.json();
          setUserProfile(profileData.user);
        }
      } catch (error) {
        console.log('Could not fetch profile');
      }
      
      // Fetch my allotment
      try {
        const allotmentResponse = await fetch('https://ap-project-v67b.onrender.com/allotment/my', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (allotmentResponse.ok) {
          const allotmentData = await allotmentResponse.json();
          setMyAllotment(allotmentData);
        }
      } catch (error) {
        console.log('No allotment found');
      }
      
      // Fetch available rooms count
      const roomsResponse = await fetch('https://ap-project-v67b.onrender.com/rooms/all', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const roomsData = await roomsResponse.json();
      const available = roomsData.filter(room => room.status === 'Available').length;
      setAvailableRooms(available);
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="content-page">
        <div className="content-header">
          <h2>Dashboard Overview</h2>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (myAllotment) {
    // Show detailed room and profile info when allocated
    return (
      <div className="content-page">
        <div className="content-header">
          <h2>Room Allocated Successfully</h2>
          <p>Your hostel accommodation details</p>
        </div>
        
        <div className="allocation-details">
          <div className="room-details-card">
            <h3>Room Details</h3>
            <div className="detail-grid">
              <div className="detail-item">
                <strong>Room Number:</strong> {myAllotment.room?.roomNumber}
              </div>
              <div className="detail-item">
                <strong>Hostel:</strong> {myAllotment.room?.hostelName || 'Main Hostel'}
              </div>
              <div className="detail-item">
                <strong>Capacity:</strong> {myAllotment.room?.capacity} students
              </div>
              <div className="detail-item">
                <strong>Floor:</strong> {Math.floor(myAllotment.room?.roomNumber / 100) || 'Ground'}
              </div>
              <div className="detail-item">
                <strong>Gender:</strong> {myAllotment.room?.gender}
              </div>
              <div className="detail-item">
                <strong>Year Group:</strong> {myAllotment.room?.yearGroup}+ years
              </div>
              <div className="detail-item">
                <strong>Allocated On:</strong> {new Date(myAllotment.dateOfAllotment).toLocaleDateString()}
              </div>
              <div className="detail-item">
                <strong>Status:</strong> <span className="status-approved">{myAllotment.status}</span>
              </div>
            </div>
          </div>

          {userProfile && (
            <div className="profile-details-card">
              <h3>Your Profile</h3>
              <div className="detail-grid">
                <div className="detail-item">
                  <strong>Name:</strong> {userProfile.name}
                </div>
                <div className="detail-item">
                  <strong>Email:</strong> {userProfile.email}
                </div>
                <div className="detail-item">
                  <strong>College:</strong> {userProfile.college}
                </div>
                <div className="detail-item">
                  <strong>Year:</strong> {userProfile.year}
                </div>
                <div className="detail-item">
                  <strong>Phone:</strong> {userProfile.phone}
                </div>
                <div className="detail-item">
                  <strong>Guardian:</strong> {userProfile.guardianName}
                </div>
                <div className="detail-item">
                  <strong>Guardian Phone:</strong> {userProfile.guardianPhone}
                </div>
                <div className="detail-item">
                  <strong>Address:</strong> {userProfile.address}
                </div>
              </div>
            </div>
          )}

          <div className="hostel-info-card">
            <h3>Hostel Information</h3>
            <div className="info-list">
              <div className="info-item"><strong>Address:</strong> College Campus, Main Block</div>
              <div className="info-item"><strong>Check-in:</strong> 9:00 AM - 6:00 PM</div>
              <div className="info-item"><strong>Warden Contact:</strong> +91-XXXX-XXXX</div>
              <div className="info-item"><strong>Mess Timings:</strong> Breakfast 7-9 AM, Lunch 12-2 PM, Dinner 7-9 PM</div>
              <div className="info-item"><strong>Curfew:</strong> 10:00 PM on weekdays, 11:00 PM on weekends</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show steps and rules when no room allocated
  return (
    <div className="content-page">
      <div className="content-header">
        <h2>Room Allocation Process</h2>
        <p>Follow these steps to get your hostel room</p>
      </div>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Available Rooms</h3>
          <div className="stat-number">{availableRooms}</div>
        </div>
        <div className="stat-card">
          <h3>Profile Status</h3>
          <div className="stat-status">{userProfile?.profileApproved === true ? 'Approved' : userProfile?.profileApproved === false ? 'Rejected' : userProfile?.profileApproved === null ? 'Pending' : 'Incomplete'}</div>
        </div>
        <div className="stat-card">
          <h3>Your Year</h3>
          <div className="stat-number">{userProfile?.year || 'N/A'}</div>
        </div>
      </div>

      <div className="steps-container">
        <h3>Allocation Steps</h3>
        <div className="steps-list">
          <div className="step-item">
            <div className="step-number">1</div>
            <div className="step-content">
              <h4>Complete Your Profile</h4>
              <p>Fill all required details in the Profile section including phone, address, and guardian information.</p>
            </div>
          </div>
          <div className="step-item">
            <div className="step-number">2</div>
            <div className="step-content">
              <h4>Wait for Admin Approval</h4>
              <p>Admin will review and approve your profile. Check Application Status for updates.</p>
            </div>
          </div>
          <div className="step-item">
            <div className="step-number">3</div>
            <div className="step-content">
              <h4>Room Allocation</h4>
              <p><strong>1st Year:</strong> Get random room allocation automatically.<br/>
              <strong>2nd+ Year:</strong> Browse and apply for available rooms.</p>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
}

function RoomList() {
  const [userYear, setUserYear] = useState(null);
  const [userGender, setUserGender] = useState(null);
  const [profileApproved, setProfileApproved] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [myAllotment, setMyAllotment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [allocating, setAllocating] = useState(false);
  const [spinningNumber, setSpinningNumber] = useState(null);

  useEffect(() => {
    checkProfileStatus();
  }, []);

  const checkProfileStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }
      
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUserYear(payload.year || 1);
      
      const response = await fetch('https://ap-project-v67b.onrender.com/auth/my-profile', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (!response.ok) {
        console.error('Profile fetch failed:', response.status);
        setLoading(false);
        return;
      }
      
      const data = await response.json();
      const currentUser = data?.user;
      
      if (currentUser) {
        setProfileApproved(currentUser.profileApproved === true);
        setUserGender(currentUser.gender || 'Male');
        fetchRooms();
        checkMyAllotment();
      }
    } catch (error) {
      console.error('Error checking profile status:', error);
    }
    setLoading(false);
  };

  const checkMyAllotment = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://ap-project-v67b.onrender.com/allotment/my', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setMyAllotment(data);
      }
    } catch (error) {
      console.log('No allotment found');
    }
  };

  const fetchRooms = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }
      
      const response = await fetch('https://ap-project-v67b.onrender.com/rooms/all', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (!response.ok) {
        console.error('Rooms fetch failed:', response.status);
        return;
      }
      
      const data = await response.json();
      console.log('Fetched rooms:', data?.length || 0, 'rooms');
      setRooms(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching rooms:', error);
      setRooms([]);
    }
  };

  const handleApply = async (roomId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://ap-project-v67b.onrender.com/allotment/apply/${roomId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      if (response.ok) {
        showNotification('Application submitted for approval!', 'success');
        fetchRooms(); // Refresh rooms
      } else {
        showNotification(data.message || 'Error applying for room', 'error');
      }
    } catch (error) {
      showNotification('Error applying for room. Please try again.', 'error');
    }
  };



  if (!profileApproved) {
    return (
      <div className="content-page">
        <div className="content-header">
          <h2>Profile Approval Required</h2>
          <p>Complete your profile to access room allocation</p>
        </div>
        <div className="profile-required">
          <h3>Profile Approval Required</h3>
          <p>Your profile must be approved by an administrator before you can access room allocation features.</p>
          <div className="approval-steps">
            <div className="approval-step">
              <strong>Step 1:</strong> Complete your profile with all required information
            </div>
            <div className="approval-step">
              <strong>Step 2:</strong> Submit your profile for admin review
            </div>
            <div className="approval-step">
              <strong>Step 3:</strong> Wait for admin approval
            </div>
          </div>
          <p><strong>Next Action:</strong> Go to the Profile section to complete your information.</p>
        </div>
      </div>
    );
  }

  const handleRandomAllocation = async () => {
    setAllocating(true);
    
    // Start spinning animation with random numbers
    const spinInterval = setInterval(() => {
      const randomRoom = Math.floor(Math.random() * 999) + 100; // Random 3-digit number
      setSpinningNumber(randomRoom);
    }, 100); // Change number every 100ms
    
    // Stop animation after 10 seconds and make API call
    setTimeout(async () => {
      clearInterval(spinInterval);
      
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('https://ap-project-v67b.onrender.com/allotment/random-allocate', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        const data = await response.json();
        if (response.ok) {
          // Show final allocated room number
          const allocatedRoom = data.allotment?.room?.roomNumber || 'Unknown';
          setSpinningNumber(allocatedRoom);
          
          setTimeout(() => {
            showNotification(`Room ${allocatedRoom} allocated successfully!`, 'success');
            checkMyAllotment();
            setAllocating(false);
            setSpinningNumber(null);
          }, 1000); // Show final number for 1 second
        } else {
          console.log('Random allocation error:', data);
          showNotification(data.message || 'Error in random allocation', 'error');
          setAllocating(false);
          setSpinningNumber(null);
        }
      } catch (error) {
        showNotification('Error in random allocation. Please try again.', 'error');
        setAllocating(false);
        setSpinningNumber(null);
      }
    }, 10000); // 10 seconds
  };

  if (userYear === 1) {
    return (
      <div className="content-page">
        <div className="content-header">
          <h2>Random Room Allocation</h2>
          <p>First year students - Select from available rooms randomly</p>
        </div>
        
        {myAllotment ? (
          <div className="allocation-status">
            <h3>Room Already Allocated</h3>
            <p>You already have a room allocated. Check Application Status for details.</p>
            <div className="allocated-room-info">
              <p><strong>Room:</strong> {myAllotment.room?.roomNumber}</p>
              <p><strong>Status:</strong> {myAllotment.status}</p>
            </div>
          </div>
        ) : (
          <div className="random-allocation-section">
            <h3>Apply for Room</h3>
            <p>Click the button below to get a room allocated randomly from available options.</p>
            
            {allocating ? (
              <div className="allocation-spinner">
                <div className="spinner-container">
                  <div className="spinning-wheel"></div>
                  <div className="room-number-display">
                    <span className="room-label">Room</span>
                    <span className="spinning-number">{spinningNumber}</span>
                  </div>
                </div>
                <p className="allocation-text">Finding your perfect room...</p>
                <div className="progress-bar">
                  <div className="progress-fill"></div>
                </div>
              </div>
            ) : (
              <button 
                className="random-allocate-btn"
                onClick={handleRandomAllocation}
                disabled={allocating}
              >
                Apply for Room
              </button>
            )}
          </div>
        )}

        <div className="available-rooms-section">
          <h3>Available Rooms</h3>
          <div className="room-grid">
            {rooms
              .filter(room => 
                room.status === 'Available' && 
                room.yearGroup <= userYear && 
                room.gender === userGender
              )
              .map(room => (
              <div key={room.id} className="room-card">
                <h4>Room {room.roomNumber}</h4>
                <p>Hostel: {room.hostelName || 'N/A'}</p>
                <p>Capacity: {room.capacity} students</p>
                <p>Year Group: {room.yearGroup}+</p>
                <p>Gender: {room.gender}</p>
                <p>Status: {room.status}</p>
              </div>
            ))}
            {rooms.filter(room => 
              room.status === 'Available' && 
              room.yearGroup <= userYear && 
              room.gender === userGender
            ).length === 0 && (
              <p>No available rooms found for your criteria.</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="content-page">
        <div className="content-header">
          <h2>Available Rooms</h2>
          <p>Loading rooms...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="content-page">
      <div className="content-header">
        <h2>Available Rooms</h2>
        <p>Browse and apply for available rooms</p>
      </div>
      
      <div className="room-grid">
        {rooms
          .filter(room => 
            room.status === 'Available' && 
            room.yearGroup <= userYear && 
            room.gender === userGender
          )
          .map(room => (
          <div key={room.id} className="room-card">
            <h4>Room {room.roomNumber}</h4>
            <p>Hostel: {room.hostelName || 'N/A'}</p>
            <p>Capacity: {room.capacity} students</p>
            <p>Year Group: {room.yearGroup}+</p>
            <p>Gender: {room.gender}</p>
            <p>Status: {room.status}</p>
            <button 
              className="apply-btn" 
              onClick={() => handleApply(room.id)}
            >
              Apply Now
            </button>
          </div>
        ))}
        {rooms.filter(room => 
          room.status === 'Available' && 
          room.yearGroup <= userYear && 
          room.gender === userGender
        ).length === 0 && (
          <p>No available rooms found for your criteria.</p>
        )}
      </div>
    </div>
  );
}

function ApplicationStatus() {
  const [profileStatus, setProfileStatus] = useState(null);
  const [allotment, setAllotment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userDisapproved, setUserDisapproved] = useState(false);

  useEffect(() => {
    fetchApplicationStatus();
  }, []);

  const fetchApplicationStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      
      console.log('Fetching application status...');
      
      // Get user profile status using new endpoint
      const profileResponse = await fetch('https://ap-project-v67b.onrender.com/auth/my-profile', {
        headers: { 
          'Authorization': `Bearer ${token}`
        }
      });
      const profileData = await profileResponse.json();
      const currentUser = profileData.user;
      
      console.log('Current user data:', currentUser);
      
      if (currentUser) {
        const hasCompleteProfile = currentUser.phone && currentUser.address && currentUser.guardianName;
        console.log('Has complete profile:', hasCompleteProfile);
        console.log('Profile approved status:', currentUser.profileApproved);
        
        if (currentUser.profileApproved === true) {
          setProfileStatus('approved');
        } else if (currentUser.profileApproved === null && hasCompleteProfile) {
          setProfileStatus('in_progress');
        } else if (currentUser.profileApproved === false) {
          setProfileStatus('disapproved');
          setUserDisapproved(true);
        } else {
          setProfileStatus('not_applied');
        }
      }
      
      // Get allotment status
      try {
        const allotmentResponse = await fetch('https://ap-project-v67b.onrender.com/allotment/my', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (allotmentResponse.ok) {
          const allotmentData = await allotmentResponse.json();
          setAllotment(allotmentData);
        }
      } catch (error) {
        console.log('No allotment found');
      }
      
    } catch (error) {
      console.error('Error fetching status:', error);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="content-page">
        <div className="content-header">
          <h2>Application Status</h2>
          <p>Loading status...</p>
        </div>
      </div>
    );
  }

  const getStatusDisplay = () => {
    switch(profileStatus) {
      case 'not_applied':
        return {
          title: 'Pending',
          message: 'Complete and submit your profile for approval',
          action: 'Go to Profile section to fill your details',
          badgeClass: 'status-not-applied'
        };
      case 'in_progress':
        return {
          title: 'In Progress',
          message: 'Your profile is under admin review',
          action: 'Please wait for admin approval',
          badgeClass: 'status-in-progress'
        };
      case 'disapproved':
        return {
          title: 'Rejected',
          message: 'Your profile was rejected. Please update and resubmit',
          action: 'Go to Profile section to update your details',
          badgeClass: 'status-disapproved'
        };
      case 'approved':
        return {
          title: 'Successful',
          message: 'Profile approved! Room allocation is now available',
          action: 'Check Available Rooms for allocation',
          badgeClass: 'status-approved'
        };
      default:
        return {
          title: 'Unknown Status',
          message: 'Please refresh the page',
          action: '',
          badgeClass: 'status-unknown'
        };
    }
  };

  const statusInfo = getStatusDisplay();

  const getTimelineSteps = () => {
    return [
      {
        id: 'pending',
        title: 'Pending',
        message: 'Submit your complete profile for approval',
        completed: profileStatus === 'in_progress' || profileStatus === 'approved',
        active: profileStatus === 'not_applied'
      },
      {
        id: 'in_progress', 
        title: 'In Progress',
        message: 'Your profile is under admin review',
        completed: profileStatus === 'approved',
        active: profileStatus === 'in_progress'
      },
      {
        id: 'successful',
        title: 'Successful', 
        message: 'Profile approved! You can now access room allocation',
        completed: profileStatus === 'approved',
        active: profileStatus === 'approved'
      }
    ];
  };

  const timelineSteps = getTimelineSteps();

  const handleRefresh = () => {
    setLoading(true);
    fetchApplicationStatus();
  };

  return (
    <div className="content-page">
      <div className="content-header">
        <h2>Application Status</h2>
        <p>Track your profile and room application progress</p>
        <button onClick={handleRefresh} className="update-btn" style={{marginTop: '10px'}}>
          Refresh Status
        </button>
      </div>
      
      <div className="timeline-container">
        <h4>Profile Approval Timeline</h4>
        <div className="timeline">
          {timelineSteps.map((step, index) => (
            <div key={step.id} className={`timeline-step ${
              step.completed ? 'completed' : step.active ? 'active' : 'pending'
            }`}>
              <div className="timeline-marker">
                {step.completed ? '✓' : index + 1}
              </div>
              <div className="timeline-content">
                <h5>{step.title}</h5>
                <p>{step.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {profileStatus === 'disapproved' && (
        <div className="status-card">
          <h4>Profile Disapproved</h4>
          <div className="status-badge status-disapproved">
            Disapproved - Fill Again and Apply Again
          </div>
          <p className="status-message">Your profile was disapproved. Please update and resubmit</p>
          <p className="status-action">Go to Profile section to update your details</p>
        </div>
      )}

      {profileStatus === 'approved' && (
        <div className="status-card">
          <h4>Room Allocation</h4>
          {allotment ? (
            <>
              <p><strong>Room:</strong> {allotment.room?.roomNumber || 'Not assigned'}</p>
              <p><strong>Hostel:</strong> {allotment.room?.hostelName || 'N/A'}</p>
              <p><strong>Status:</strong> <span className={`status-badge status-${allotment.status}`}>{allotment.status}</span></p>
              <p><strong>Allocated:</strong> {new Date(allotment.dateOfAllotment).toLocaleDateString()}</p>
            </>
          ) : (
            <p>No room allocated yet. Check Available Rooms to apply.</p>
          )}
        </div>
      )}
    </div>
  );
}

function Profile() {
  const [formData, setFormData] = useState({
    name: 'Student Name',
    email: 'student@example.com',
    college: 'ABC College'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://ap-project-v67b.onrender.com/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        showNotification('Profile updated successfully!', 'success');
      } else {
        showNotification('Error updating profile. Please try again.', 'error');
      }
    } catch (error) {
      showNotification('Error updating profile. Please try again.', 'error');
    }
  };

  return (
    <div className="content-page">
      <div className="content-header">
        <h2>Profile Settings</h2>
        <p>Manage your account information</p>
      </div>
      
      <form className="profile-form" onSubmit={handleUpdate}>
        <div className="form-group">
          <label>Full Name</label>
          <input 
            type="text" 
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input 
            type="email" 
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>College</label>
          <input 
            type="text" 
            name="college"
            value={formData.college}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="update-btn">Update Profile</button>
      </form>
    </div>
  );
}

function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [userYear, setUserYear] = useState(null);
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUserYear(payload.year);
    }
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  const renderContent = () => {
    switch(activeTab) {
      case 'rooms': return <RoomList />;
      case 'status': return <ApplicationStatus />;

      case 'profile': return <ProfileForm />;
      default: return <Overview />;
    }
  };

  return (
    <div className="dashboard-layout">
      <header className="dashboard-header">
        <h1>Hostel Management System</h1>
        <div className="header-info">
          <span>Year: {userYear}</span>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </header>
      
      <div className="dashboard-body">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} userYear={userYear} />
        <main className="dashboard-main">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;