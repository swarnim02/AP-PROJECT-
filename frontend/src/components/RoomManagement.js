import { useState, useEffect } from 'react';
import LoadingSpinner from './LoadingSpinner';

function RoomManagement() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  const [formData, setFormData] = useState({
    roomNumber: '',
    capacity: '',
    yearGroup: ''
  });

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5002/admin/rooms', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setRooms(data.rooms || []);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const url = editingRoom 
      ? `http://localhost:5002/rooms/update/${editingRoom.id}`
      : 'http://localhost:5002/rooms/create';
    
    try {
      await fetch(url, {
        method: editingRoom ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          capacity: parseInt(formData.capacity),
          yearGroup: parseInt(formData.yearGroup)
        })
      });
      
      setShowForm(false);
      setEditingRoom(null);
      setFormData({ roomNumber: '', capacity: '', yearGroup: '' });
      fetchRooms();
    } catch (error) {
      console.error('Error saving room:', error);
    }
  };

  const handleEdit = (room) => {
    setEditingRoom(room);
    setFormData({
      roomNumber: room.roomNumber,
      capacity: room.capacity.toString(),
      yearGroup: room.yearGroup.toString()
    });
    setShowForm(true);
  };

  const handleDelete = async (roomId) => {
    if (!window.confirm('Delete this room?')) return;
    
    try {
      const token = localStorage.getItem('token');
      await fetch(`http://localhost:5002/rooms/delete/${roomId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchRooms();
    } catch (error) {
      console.error('Error deleting room:', error);
    }
  };

  if (loading) return <LoadingSpinner message="Loading rooms..." />;

  return (
    <div className="content-page">
      <div className="content-header">
        <h2>Room Management</h2>
        <button 
          className="submit-btn" 
          onClick={() => setShowForm(true)}
        >
          Add New Room
        </button>
      </div>

      {showForm && (
        <div className="form-modal">
          <form onSubmit={handleSubmit} className="room-form">
            <h3>{editingRoom ? 'Edit Room' : 'Add New Room'}</h3>
            
            <div className="form-group">
              <label>Room Number</label>
              <input
                type="text"
                value={formData.roomNumber}
                onChange={(e) => setFormData({...formData, roomNumber: e.target.value})}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Capacity</label>
              <input
                type="number"
                value={formData.capacity}
                onChange={(e) => setFormData({...formData, capacity: e.target.value})}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Year Group</label>
              <select
                value={formData.yearGroup}
                onChange={(e) => setFormData({...formData, yearGroup: e.target.value})}
                required
              >
                <option value="">Select Year</option>
                <option value="1">1st Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
                <option value="4">4th Year</option>
              </select>
            </div>
            
            <div className="form-actions">
              <button type="submit" className="submit-btn">
                {editingRoom ? 'Update' : 'Create'}
              </button>
              <button 
                type="button" 
                className="cancel-btn"
                onClick={() => {
                  setShowForm(false);
                  setEditingRoom(null);
                  setFormData({ roomNumber: '', capacity: '', yearGroup: '' });
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="room-grid">
        {rooms.map(room => (
          <div key={room.id} className="room-card">
            <h4>Room {room.roomNumber}</h4>
            <p>Capacity: {room.capacity} students</p>
            <p>Year Group: {room.yearGroup}</p>
            <p>Status: {room.status}</p>
            
            <div className="room-actions">
              <button 
                className="update-btn"
                onClick={() => handleEdit(room)}
              >
                Edit
              </button>
              <button 
                className="cancel-btn"
                onClick={() => handleDelete(room.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RoomManagement;