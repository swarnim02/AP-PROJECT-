const API_BASE_URL = 'http://localhost:5002';
// Frontend now runs on port 5174

const api = {
  async login(email, password) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  },

  async register(userData) {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  },

  async getRooms() {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/rooms/all`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return response.json();
    } catch (error) {
      console.error('Error fetching rooms:', error);
      throw error;
    }
  },

  async applyForRoom(roomId) {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/allotment/apply/${roomId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return response.json();
    } catch (error) {
      console.error('Error applying for room:', error);
      throw error;
    }
  },

  async getMyAllotment() {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/allotment/my`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return response.json();
    } catch (error) {
      console.error('Error fetching allotment:', error);
      throw error;
    }
  },

  // Admin APIs
  async getAllUsers() {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/admin/users`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.json();
  },

  async getAllRooms() {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/admin/rooms`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.json();
  },

  async getAllApplications() {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/allotment/all`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.json();
  }
};

export default api;