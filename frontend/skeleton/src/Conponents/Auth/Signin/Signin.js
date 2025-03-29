import React from "react";
import { Link } from "react-router-dom";
import "../Signin/Signin.css";

const SignIn = () => {
  return (
    <div className="signin-container">
      <div className="signin-box">
        <h1 className="signin-title">Create a new Skeleton account</h1>

        <form>
          <input type="text" placeholder="Full Name" className="input" />
          <input type="email" placeholder="Email" className="input" />
          <input type="password" placeholder="Password" className="input" />
          <button type="submit" className="submit-button">
            Sign Up
          </button>
        </form>

        <p className="switch-text">
          Already have an account?{" "}
          <Link to="/login" className="switch-link">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
