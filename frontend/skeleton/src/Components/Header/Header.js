import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <header className="main-header">
      <div className="logo"><Link to="/">🦴 Skeleton</Link></div>
      <nav className="nav-links">
        <Link to="/home">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/signin">Sign Up</Link>
      </nav>
    </header>
  );
};

export default Header;
