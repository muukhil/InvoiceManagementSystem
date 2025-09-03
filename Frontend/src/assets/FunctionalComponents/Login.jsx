import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import '../CSS/Signup.css'; // ✅ Reuse the same CSS for consistent design

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState(location.state?.email || '');
  const [password, setPassword] = useState(location.state?.password || '');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const req = await axios.post('http://localhost:5000/login', { email, password });
      const isLoginSuccessful = req.data.isLoggedIn;

      if (isLoginSuccessful) {
        alert(req.data.message);
        localStorage.setItem('isLoggedIn', 'true');
        navigate('/');
      } else {
        setErrorMessage(req.data.message || 'Login failed');
      }
    } catch (err) {
      setErrorMessage('Server error. Please try again.');
      console.error(err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="signup-container">
        <form className="signup-form" onSubmit={handleLogin}>
          <h2>Login</h2>

          <div className="form-group">
            <label>Email</label>
            <input
              type="text"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {errorMessage && <p className="error">{errorMessage}</p>}

          <button type="submit" className="submit-btn">
            Login
          </button>

          <p className="login-link">
            New here? <Link to="/signup">Signup</Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
