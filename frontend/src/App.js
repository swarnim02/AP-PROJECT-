import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import api from './services/api';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import RoleBasedRoute from './components/RoleBasedRoute';
import Notification from './components/Notification';
import ErrorBoundary from './components/ErrorBoundary';

function Landing() {
  return (
    <div className="landing">
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <h2>HOSTEL SYSTEM</h2>
          </div>
          <div className="nav-links">
            <a href="#features" className="nav-link">Features</a>
            <a href="#about" className="nav-link">About</a>
            <a href="#contact" className="nav-link">Contact</a>
            <div className="nav-auth">
              <Link to="/login" className="nav-btn login-nav-btn">Login</Link>
              <Link to="/signup" className="nav-btn signup-nav-btn">Register</Link>
            </div>
          </div>
        </div>
      </nav>
      
      <header className="hero-section">
        <div className="hero-content">
          <h1>HOSTEL ROOM ALLOTMENT SYSTEM</h1>
          <p>Modern digital platform for seamless student accommodation management</p>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">24</span>
              <span className="stat-label">Rooms Available</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">3</span>
              <span className="stat-label">Hostels</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">100%</span>
              <span className="stat-label">Digital</span>
            </div>
          </div>
        </div>
      </header>
      
      <main className="main">
        <div className="content">
          <section className="intro">
            <h2>System Overview</h2>
            <p>Digital platform for managing hostel room assignments and student applications.</p>
          </section>
          
          <section id="features" className="features-section">
            <h2>SYSTEM FEATURES</h2>
            <div className="features-grid">
              <div className="feature-card">
                <h3>Student Portal</h3>
                <ul>
                  <li>Browse available rooms</li>
                  <li>Submit room applications</li>
                  <li>Track application status</li>
                  <li>Profile management</li>
                  <li>Real-time notifications</li>
                </ul>
              </div>
              
              <div className="feature-card">
                <h3>Admin Panel</h3>
                <ul>
                  <li>Room inventory management</li>
                  <li>Application processing</li>
                  <li>User management</li>
                  <li>System analytics</li>
                  <li>Report generation</li>
                </ul>
              </div>
              
              <div className="feature-card">
                <h3>Room Management</h3>
                <ul>
                  <li>Multiple hostel support</li>
                  <li>Gender-based allocation</li>
                  <li>Year-wise room grouping</li>
                  <li>Capacity tracking</li>
                  <li>Availability monitoring</li>
                </ul>
              </div>
            </div>
          </section>
          
          <section id="about" className="about-section">
            <div className="about-content">
              <h2>ABOUT THE SYSTEM</h2>
              <p>Our Hostel Room Allotment System revolutionizes student accommodation management with a modern, digital-first approach. Built with cutting-edge technology, it ensures fair, transparent, and efficient room allocation for all students.</p>
              
              <div className="tech-stack">
                <h3>TECHNOLOGY STACK</h3>
                <div className="tech-items">
                  <span className="tech-item">React 18</span>
                  <span className="tech-item">Node.js</span>
                  <span className="tech-item">Express</span>
                  <span className="tech-item">MySQL</span>
                  <span className="tech-item">Prisma ORM</span>
                  <span className="tech-item">JWT Auth</span>
                </div>
              </div>
            </div>
          </section>
          
          <section className="cta-section">
            <h2>GET STARTED TODAY</h2>
            <p>Join thousands of students using our digital hostel management system</p>
            <div className="cta-buttons">
              <Link to="/login" className="btn login-btn">Login</Link>
              <Link to="/signup" className="btn signup-btn">Register</Link>
            </div>
          </section>
        </div>
      </main>
      
      <footer id="contact" className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>HOSTEL SYSTEM</h3>
            <p>Modern digital platform for student accommodation management</p>
          </div>
          
          <div className="footer-section">
            <h4>QUICK LINKS</h4>
            <ul>
              <li><a href="#features">Features</a></li>
              <li><a href="#about">About</a></li>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/signup">Register</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>CONTACT INFO</h4>
            <ul>
              <li>Email: support@hostelsystem.com</li>
              <li>Phone: +91 98765 43210</li>
              <li>Address: College Campus, City</li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>TECH STACK</h4>
            <ul>
              <li>React 18 + Node.js</li>
              <li>Express + MySQL</li>
              <li>Prisma ORM + JWT</li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2024 Hostel Room Allotment System. Built by Team Devs</p>
        </div>
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
    gender: '',
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
            <label>Gender</label>
            <select 
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
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
    <ErrorBoundary>
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
        <Notification />
      </Router>
    </ErrorBoundary>
  );
}

export default App;