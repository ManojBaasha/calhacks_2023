import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/TopBar.css'
import synthiaLogo from '../assets/synthiaLogo.png';

const TopNavBar = () => {
  return (
    <nav className="top-nav-bar">
      <ul className="nav-links">
        <li className="nav-link-item">
          <Link to="/">Home</Link>
        </li>
        <li className="logo-item">
          <img src={synthiaLogo} alt="Logo" className="logo-image" />
        </li>
        <li className="nav-link-item">
          <Link to="/chat">Chat</Link>
        </li>
      </ul>
    </nav>
  );
};
export default TopNavBar;

