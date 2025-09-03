import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from './Navbar';
import axios from 'axios';
import '../CSS/Signup.css';

const Signup = () => {
  const navigate = useNavigate();
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [password, setpassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [phonenumber, setphonenumber] = useState('');
  const [email, setemail] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSignup = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    } else {
      setPasswordError('');
    }

    try {
      const req = await axios.post('http://localhost:5000/signup', {
        firstName,
        lastName,
        email,
        password,
        phoneNumber: phonenumber,
      });

      const { message, isSignup } = req.data;

      if (isSignup) {
        alert(message);
        navigate('/login', {
          state: { email, password },
        });
      } else {
        alert(message);
      }
    } catch (error) {
      setPasswordError('Signup failed. Try again.');
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="signup-container">
        <form className="signup-form" onSubmit={handleSignup}>
          <h2>Create Account</h2>

          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setfirstName(e.target.value)}
              placeholder="Enter First Name"
              required
            />
          </div>

          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setlastName(e.target.value)}
              placeholder="Enter Last Name"
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              placeholder="Enter Email"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              placeholder="Enter Password"
              required
            />
          </div>

          <div className="form-group">
            <label>Re-enter Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setconfirmPassword(e.target.value)}
              placeholder="Re-enter Password"
              required
            />
            {passwordError && <p className="error">{passwordError}</p>}
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              value={phonenumber}
              onChange={(e) => setphonenumber(e.target.value)}
              placeholder="Enter Phone Number"
              required
            />
          </div>

          <button type="submit" className="submit-btn">Sign Up</button>

          <p className="login-link">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Signup;
