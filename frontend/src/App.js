import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import api from './services/api';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import RoleBasedRoute from './components/RoleBasedRoute';

function Landing() {
  return (
    <div className="landing">
      <header className="header">
        <h1>Hostel Room Allotment System</h1>
        <p>Student accommodation management portal</p>
      </header>
      
      <main className="main">
        <div className="content">
          <section className="intro">
            <h2>System Overview</h2>
            <p>Digital platform for managing hostel room assignments and student applications.</p>
          </section>
          
          <div className="modules">
            <div className="module">
              <h3>Student Portal</h3>
              <ul>
                <li>Browse available rooms</li>
                <li>Submit room applications</li>
                <li>View assignment status</li>
              </ul>
            </div>
            
            <div className="module">
              <h3>Admin Panel</h3>
              <ul>
                <li>Room inventory management</li>
                <li>Application processing</li>
                <li>System reports</li>
              </ul>
            </div>
          </div>
          
          <div className="auth-section">
            <div className="auth-buttons">
              <Link to="/login" className="btn login-btn">Login</Link>
              <Link to="/signup" className="btn signup-btn">Register</Link>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="footer">
        <p>Devs Team | Node.js + React + MySQL</p>
      </footer>
    </div>
  );
}

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const result = await api.login(email, password);
      if (result.token) {
        localStorage.setItem('token', result.token);
        
        // Decode token to get user role
        const payload = JSON.parse(atob(result.token.split('.')[1]));
        const userRole = payload.role;
        
        // Redirect based on role
        if (userRole === 'admin') {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      } else {
        // Handle specific error messages from backend
        if (result.message === 'User not found') {
          setError('No account found with this email address');
        } else if (result.message === 'Invalid password') {
          setError('Incorrect password. Please try again');
        } else if (result.message && result.message.includes('Email and password required')) {
          setError('Please fill in both email and password');
        } else {
          setError(result.message || 'Login failed. Please check your credentials');
        }
      }
    } catch (err) {
      if (err.message.includes('HTTP error! status: 400')) {
        setError('Invalid login credentials');
      } else if (err.message.includes('HTTP error! status: 500')) {
        setError('Server error. Please try again later');
      } else {
        setError('Network error. Please check your connection');
      }
    }
    setLoading(false);
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <h2>Login</h2>
          <p>Access your account</p>
        </div>
        
        <form className="auth-form" onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <label>Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        
        <div className="auth-footer">
          <p>Don't have an account? <Link to="/signup">Register here</Link></p>
          <Link to="/" className="back-link">Back to Home</Link>
        </div>
      </div>
    </div>
  );
}

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    college: '',
    year: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Client-side validation
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }
    
    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }
    
    try {
      const userData = {
        ...formData,
        year: parseInt(formData.year),
        role: 'student'
      };
      const result = await api.register(userData);
      if (result.user) {
        setSuccess('Registration successful! Redirecting to login...');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        // Handle specific error messages from backend
        if (result.message === 'Email already exists') {
          setError('An account with this email already exists. Please login instead');
        } else if (result.message && result.message.includes('All fields')) {
          setError('Please fill in all required fields');
        } else if (result.message && result.message.includes('Password must be')) {
          setError('Password must be at least 6 characters long');
        } else if (result.message && result.message.includes('Year must be')) {
          setError('Please select a valid year (1-4)');
        } else {
          setError(result.message || 'Registration failed. Please try again');
        }
      }
    } catch (err) {
      if (err.message.includes('HTTP error! status: 400')) {
        setError('Invalid registration data. Please check all fields');
      } else if (err.message.includes('HTTP error! status: 500')) {
        setError('Server error. Please try again later');
      } else {
        setError('Network error. Please check your connection');
      }
    }
    setLoading(false);
  };

  return (
    <div className="auth-page">
      <div className="auth-container register-container">
        <div className="auth-header">
          <h2>Register</h2>
          <p>Create your account</p>
        </div>
        
        <form className="auth-form" onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}
          
          <div className="form-group">
            <label>Full Name</label>
            <input 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              required 
            />
          </div>
          
          <div className="form-group">
            <label>Email Address</label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              required 
            />
          </div>
          
          <div className="form-group">
            <label>College</label>
            <input 
              type="text" 
              name="college"
              value={formData.college}
              onChange={handleChange}
              required 
            />
          </div>
          
          <div className="form-group">
            <label>Year</label>
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
            <label>Password</label>
            <input 
              type="password" 
              name="password"
              value={formData.password}
              onChange={handleChange}
              required 
            />
          </div>
          
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        
        <div className="auth-footer">
          <p>Already have an account? <Link to="/login">Login here</Link></p>
          <Link to="/" className="back-link">Back to Home</Link>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <RoleBasedRoute requiredRole="student">
              <Dashboard />
            </RoleBasedRoute>
          </ProtectedRoute>
        } />
        <Route path="/admin" element={
          <ProtectedRoute>
            <RoleBasedRoute requiredRole="admin">
              <AdminDashboard />
            </RoleBasedRoute>
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;