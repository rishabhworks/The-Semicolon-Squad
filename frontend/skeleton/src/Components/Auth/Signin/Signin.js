import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Auth.css";

const SignIn = () => {
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    const response = await fetch("http://127.0.0.1:5000/api/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: email, // Using email as username
        password: password,
        route: "signup"
      }),
    });

    const data = await response.json();
    if (response.ok) {
      console.log("✅ Signup successful");
      navigate("/home");
    } else {
      console.error("❌ Signup failed:", data.message || data.error);
      alert("Signup failed");
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-box">
        <h1 className="signin-title">Create a new Skeleton account</h1>
        <form onSubmit={handleSignup}>
          <input name="name" type="text" placeholder="Full Name" className="input" />
          <input name="email" type="email" placeholder="Email" className="input" />
          <input name="password" type="password" placeholder="Password" className="input" />
          <button type="submit" className="submit-button">Sign Up</button>
        </form>

        <p className="switch-text">
          Already have an account? <Link to="/login" className="switch-link">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
