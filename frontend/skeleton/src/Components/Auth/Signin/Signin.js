import React from "react";
import { Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import "./Signin.css";

const SignIn = () => {
  const handleGoogleSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    console.log("✅ Google User Info:", decoded);
    // You can send 'decoded' to your backend for further auth handling
  };

  const handleGoogleError = () => {
    console.error("❌ Google Sign-In failed");
  };

  return (
    <div className="signin-container">
      <div className="signin-box">
        <h1 className="signin-title">Create a new Skeleton account</h1>

        <form>
          <input type="text" placeholder="Full Name" className="input" />
          <input type="email" placeholder="Email" className="input" />
          <input type="password" placeholder="Password" className="input" />
          <button type="submit" className="submit-button">Sign Up</button>
        </form>

        <div className="google-login">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
          />
        </div>

        <p className="switch-text">
          Already have an account?{" "}
          <Link to="/login" className="switch-link">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
