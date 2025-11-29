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
        <p>AP-PROJECT Team | Node.js + React + MySQL</p>
      </footer>
    </div>
  );
}

function Login() {
  return <div className="page"><h2>Login</h2><p>Authentication page under development</p></div>;
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