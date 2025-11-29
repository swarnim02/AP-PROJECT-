const API_BASE_URL = 'http://localhost:5002';

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
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/rooms/all`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.json();
  },

  async applyForRoom(roomId) {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/allotment/apply/${roomId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    });
    return response.json();
  },

  async getMyAllotment() {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/allotment/my`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.json();
  }
};

export default api;