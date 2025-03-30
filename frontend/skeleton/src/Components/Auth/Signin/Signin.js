import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Auth.css";
import { signupUser } from "../../../Services/signinapi"; // adjust path if needed

const SignIn = () => {
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    const result = await signupUser(email, password);

    if (result.success) {
      console.log("✅ Signup successful");
      alert("🎉 Account created successfully. Please log in.");
      navigate("/login"); // Redirect to login instead of home
    } else {
      console.error("❌ Signup failed:", result.message);
      alert(result.message || "Signup failed. Please try again.");
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
