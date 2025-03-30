import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Auth.css";
import { loginUser } from "../../../Services/loginapi"; // Adjust path if needed

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log("Logging in with:", email, password);

    const result = await loginUser(email, password);

    if (result.success) {
      localStorage.setItem("userAuthenticated", "true");
      navigate("/home"); // ✅ This is what redirects
    }         
          else {
      console.error("❌ Login failed:", result.message);
      alert(result.message);
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
