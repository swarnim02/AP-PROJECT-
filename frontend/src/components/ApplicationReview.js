import { useState, useEffect } from 'react';
import LoadingSpinner from './LoadingSpinner';

function ApplicationReview() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5002/allotment/all', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setApplications(data.allotments || []);
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
    setLoading(false);
  };

  const handleApprove = async (studentId) => {
    try {
      const token = localStorage.getItem('token');
      await fetch(`http://localhost:5002/allotment/approve/${studentId}`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchApplications();
    } catch (error) {
      console.error('Error approving application:', error);
    }
  };

  const handleReject = async (applicationId) => {
    if (!window.confirm('Reject this application?')) return;
    
    try {
      const token = localStorage.getItem('token');
      await fetch(`http://localhost:5002/allotment/reject/${applicationId}`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchApplications();
    } catch (error) {
      console.error('Error rejecting application:', error);
    }
  };

  if (loading) return <LoadingSpinner message="Loading applications..." />;

  return (
    <div className="content-page">
      <div className="content-header">
        <h2>Application Review</h2>
        <p>Review and process student room applications</p>
      </div>

      <div className="applications-list">
        {applications.length === 0 ? (
          <div className="no-data">No applications found</div>
        ) : (
          applications.map(app => (
            <div key={app.id} className="application-card">
              <div className="app-info">
                <h4>{app.student?.name || 'Unknown Student'}</h4>
                <p>Email: {app.student?.email}</p>
                <p>College: {app.student?.college}</p>
                <p>Year: {app.student?.year}</p>
                <p>Room: {app.room?.roomNumber}</p>
                <p>Applied: {new Date(app.dateOfAllotment).toLocaleDateString()}</p>
              </div>
              
              <div className="app-actions">
                <button 
                  className="approve-btn"
                  onClick={() => handleApprove(app.studentId)}
                >
                  Approve
                </button>
                <button 
                  className="reject-btn"
                  onClick={() => handleReject(app.id)}
                >
                  Reject
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ApplicationReview;