import { useState, useEffect } from 'react';
import LoadingSpinner from './LoadingSpinner';

function ProfileEditor() {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    college: '',
    year: ''
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // Get user data from token
    const token = localStorage.getItem('token');

    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));

      setProfile({
        name: payload.name || '',
        email: payload.email || '',
        college: payload.college || '',
        year: payload.year?.toString() || ''
      });
    }

    setLoading(false); // FIXED: moved inside useEffect
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const token = localStorage.getItem('token');

      const response = await fetch('https://ap-project-v67b.onrender.com/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: profile.name,
          college: profile.college,
          year: parseInt(profile.year)
        })
      });

      const data = await response.json();

      if (data.success) {
        alert('Profile updated successfully!');
      } else {
        alert('Error updating profile');
      }
    } catch (error) {
      alert('Network error');
    }

    setSaving(false);
  };

  if (loading) return <LoadingSpinner message="Loading profile..." />;

  return (
    <div className="content-page">
      <div className="content-header">
        <h2>Profile Settings</h2>
        <p>Manage your account information</p>
      </div>

      <form onSubmit={handleSubmit} className="profile-form">

        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label>Email (Read Only)</label>
          <input
            type="email"
            value={profile.email}
            disabled
          />
        </div>

        <div className="form-group">
          <label>College</label>
          <input
            type="text"
            value={profile.college}
            onChange={(e) => setProfile({ ...profile, college: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label>Year</label>
          <select
            value={profile.year}
            onChange={(e) => setProfile({ ...profile, year: e.target.value })}
            required
          >
            <option value="">Select Year</option>
            <option value="1">1st Year</option>
            <option value="2">2nd Year</option>
            <option value="3">3rd Year</option>
            <option value="4">4th Year</option>
          </select>
        </div>

        <button type="submit" className="update-btn" disabled={saving}>
          {saving ? 'Updating...' : 'Update Profile'}
        </button>
      </form>
    </div>
  );
}

export default ProfileEditor;
