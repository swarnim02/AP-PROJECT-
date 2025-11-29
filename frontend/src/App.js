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
  return <div className="page"><h2>Register</h2><p>Registration page under development</p></div>;
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