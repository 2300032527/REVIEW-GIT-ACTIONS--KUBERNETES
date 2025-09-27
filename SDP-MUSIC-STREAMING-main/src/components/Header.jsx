import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'; // use axios directly
import './Header.css';

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [role, setRole] = useState('User');
  const location = useLocation();
  const navigate = useNavigate();

  // Use VITE env variable for API base URL
  const API_BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios
        .get(`${API_BASE_URL}/user`, { headers: { 'x-access-token': token } })
        .then(res => setRole(res.data.role))
        .catch(() => localStorage.clear());
    }
  }, []);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleClickOutside = (event) => {
    if (!event.target.closest('.profile') && !event.target.closest('.hamburger')) {
      setDropdownOpen(false);
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    if (dropdownOpen || menuOpen) {
      document.addEventListener('click', handleClickOutside);
    }
    return () => document.removeEventListener('click', handleClickOutside);
  }, [dropdownOpen, menuOpen]);

  const isActive = (path) => (location.pathname === path ? 'active' : '');

  return (
    <header className="header">
      <button className="hamburger" onClick={toggleMenu} aria-label="Toggle navigation menu">☰</button>
      <div className={`nav-left ${menuOpen ? 'open' : ''}`}>
        <button className={`nav-btn ${isActive('/')}`} onClick={() => { setMenuOpen(false); navigate('/'); }}>Home</button>
        <button className={`nav-btn ${isActive('/genres')}`} onClick={() => { setMenuOpen(false); navigate('/genres'); }}>Genres</button>
        <button className={`nav-btn ${isActive('/playlists')}`} onClick={() => { setMenuOpen(false); navigate('/playlists'); }}>Playlists</button>
      </div>
      <div className="nav-right">
        <div className="profile">
          <button
            className="nav-btn profile-btn"
            onClick={toggleDropdown}
            aria-expanded={dropdownOpen}
            aria-haspopup="true"
            aria-label="User profile menu"
          >
            {role}<span className="dropdown-arrow">▼</span>
          </button>
          {dropdownOpen && (
            <ul className="dropdown" role="menu">
              <li role="menuitem" tabIndex="0" onClick={() => { setDropdownOpen(false); navigate('/admin-login'); }}>Admin</li>
              <li role="menuitem" tabIndex="0" onClick={() => { setDropdownOpen(false); localStorage.clear(); navigate('/login'); }}>Log Out</li>
            </ul>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
