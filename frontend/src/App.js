import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import api from './services/api';
import Dashboard from './components/Dashboard';

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
        navigate('/dashboard');
      } else {
        setError(result.message || 'Login failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
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
    
    try {
      const userData = {
        ...formData,
        year: parseInt(formData.year),
        role: 'student'
      };
      const result = await api.register(userData);
      if (result.user) {
        navigate('/login');
      } else {
        setError(result.message || 'Registration failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
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
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;