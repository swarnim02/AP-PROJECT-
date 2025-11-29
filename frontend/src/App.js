import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

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
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Add login logic
    console.log('Login submitted');
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <h2>Login</h2>
          <p>Access your account</p>
        </div>
        
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" required />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input type="password" required />
          </div>
          
          <button type="submit" className="submit-btn">Login</button>
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
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Add registration logic
    console.log('Registration submitted');
  };

  return (
    <div className="auth-page">
      <div className="auth-container register-container">
        <div className="auth-header">
          <h2>Register</h2>
          <p>Create your account</p>
        </div>
        
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" required />
          </div>
          
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" required />
          </div>
          
          <div className="form-group">
            <label>College</label>
            <input type="text" required />
          </div>
          
          <div className="form-group">
            <label>Year</label>
            <select required>
              <option value="">Select Year</option>
              <option value="1">1st Year</option>
              <option value="2">2nd Year</option>
              <option value="3">3rd Year</option>
              <option value="4">4th Year</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input type="password" required />
          </div>
          
          <div className="form-group">
            <label>Role</label>
            <select required>
              <option value="student">Student</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          
          <button type="submit" className="submit-btn">Register</button>
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
      </Routes>
    </Router>
  );
}

export default App;