// src/Components/Auth/Login/Login.js

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import "../Auth.css";

const Login = () => {
  const navigate = useNavigate();

  const handleGoogleSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    console.log("✅ Logged in with Google:", decoded);
    // You could save this to localStorage or app context
    navigate("/home");
  };

  const handleGoogleError = () => {
    console.error("❌ Google Sign-In failed");
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Log in to your Skeleton account</h1>

        <form>
          <input type="email" placeholder="Email" className="input" />
          <div className="password-container">
            <input type="password" placeholder="Password" className="input" />
            <button type="button" className="password-toggle">👁️</button>
          </div>
          <a href="#" className="forgot-password">Forgot password?</a>

          <button type="submit" className="login-button">Log in</button>
        </form>

        <div className="google-login">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
          />
        </div>

        <p className="switch-text">
          Don’t have an account?{" "}
          <Link to="/signin" className="switch-link">Sign up</Link>
        </p>

        <p className="terms-text">
          By continuing, you agree to our{" "}
          <a href="#" className="terms-link">Terms of Service</a> and{" "}
          <a href="#" className="terms-link">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
};

export default Login;
