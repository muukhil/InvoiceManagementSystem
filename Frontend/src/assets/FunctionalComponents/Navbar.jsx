// import React, {useState} from 'react'
// import { Link } from 'react-router-dom'
// import '../CSS/Navbar.css'

// const Navbar = () => {
//     const [dropdown, showdropdown] = useState(false);
//   return (
//     <header>
//         <nav>
//             <li><Link to="/" className="">Home</Link></li>
//             <li><Link to="/login" className="">Login</Link></li>
//             <li><Link to="/signup" className="">Signup</Link></li>
//             <li><Link to="/invoice" className="">Invoice</Link></li>
//         </nav>
//     </header>
//   )
// }

// export default Navbar

import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../CSS/Navbar.css';
import AuthContext from '../../AuthContext';

const Navbar = () => {
  const {isLoggedIn, setIsLoggedIn} = useContext(AuthContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  console.log("AuthContext in Navbar:", AuthContext);

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    navigate('/login');
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <header>
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <ul style={{ listStyle: 'none', display: 'flex', gap: '20px', margin: 0 }}>
          <li><Link to="/">Home</Link></li>
          {!isLoggedIn && (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/signup">Signup</Link></li>
            </>
          )}
          <li><Link to="/invoice">Invoice</Link></li>
        </ul>

        {isLoggedIn && (
          <div className="profile-container" style={{ position: 'relative' }}>
            <button
              onClick={toggleDropdown}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              👤 Profile ▼
            </button>

            {showDropdown && (
              <div className="dropdown-menu" style={{
                position: 'absolute',
                right: 0,
                top: '100%',
                background: '#fff',
                boxShadow: '0px 4px 8px rgba(0,0,0,0.1)',
                borderRadius: '4px',
                overflow: 'hidden',
                zIndex: 1
              }}>
                <Link to="/profile" className="dropdown-item" style={dropdownItemStyle}>Profile</Link>
                <Link to="/settings" className="dropdown-item" style={dropdownItemStyle}>Settings</Link>
                <button onClick={handleLogout} style={{ ...dropdownItemStyle, border: 'none', background: 'none', width: '100%', textAlign: 'left' }}>Logout</button>
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

const dropdownItemStyle = {
  padding: '10px 15px',
  display: 'block',
  width: '100%',
  textDecoration: 'none',
  color: '#333',
  background: '#fff',
  borderBottom: '1px solid #eee',
  cursor: 'pointer'
};

export default Navbar;