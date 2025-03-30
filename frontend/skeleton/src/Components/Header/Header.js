import React, { useState } from "react";
import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css"; // Import FontAwesome
import "./Header.css";

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <header className="main-header">
      <div className="logo">
        <Link to="/">🦴 Skeleton</Link>
      </div>
      <nav className="nav-links">
        <div className="dropdown">
          <button className="dropdown-btn" onClick={toggleDropdown}>
            <i className="fas fa-user-circle"></i> {/* User icon */}
          </button>
          {dropdownOpen && (
            <div className="dropdown-menu">
              <Link to="/login" className="dropdown-item">Login</Link>
              <Link to="/signin" className="dropdown-item">Sign Up</Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;