import React from 'react';
import logo from '../logo.avif';
import logout from '../logout.png';
import '../styling/Navbar.css'; 
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

    const navigate = useNavigate();

    const handleLogout = () =>{
        localStorage.removeItem('authToken')
        localStorage.removeItem('role')
        sessionStorage.clear();
        navigate('/')
    }

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <img src={logo} alt="Connectly Logo" className="navbar-logo" />
        <h5 className="navbar-title">Connectly</h5>
      </div>
      <div className="navbar-actions">
        <button className="logout-btn" onClick={handleLogout}>
          <img src={logout} alt="Logout Icon" className="logout-icon" />
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
