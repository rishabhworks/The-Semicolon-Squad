import React from "react";
import { Link } from "react-router-dom";
import './WelcomePage.css';

function Homepage() {
  return (
    <div className="homepage-container">
      <h1>Welcome to Our Project Setup</h1>
      <p>Get started with configuring your project to your tailored tech stack!!</p>
      <div className="button-container">
        <Link to="/login" className="button-link">
          <button className="button">Login</button>
        </Link>
        <Link to="/signin" className="button-link">
          <button className="button">Sign Up</button>
        </Link>
      </div>
    </div>
  );
}

export default Homepage;
