import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Auth.css";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    const response = await fetch("http://127.0.0.1:5000/api/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: email, // Using email as username
        password: password,
        route: "login"
      }),
    });

    const data = await response.json();
    if (response.ok) {
      console.log("✅ Login successful");
      navigate("/home");
    } else {
      console.error("❌ Login failed:", data.message || data.error);
      alert("Login failed");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Log in to your Skeleton account</h1>
        <form onSubmit={handleLogin}>
          <input name="email" type="email" placeholder="Email" className="input" />
          <div className="password-container">
            <input name="password" type="password" placeholder="Password" className="input" />
            <button type="button" className="password-toggle">👁️</button>
          </div>
          <button type="button" className="forgot-password">Forgot password?</button>
          <button type="submit" className="login-button">Log in</button>
        </form>

        <p className="switch-text">
          Don’t have an account? <Link to="/signin" className="switch-link">Sign up</Link>
        </p>

        <p className="terms-text">
          By continuing, you agree to our <a className="terms-link">Terms of Service</a> and <a className="terms-link">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
};

export default Login;
