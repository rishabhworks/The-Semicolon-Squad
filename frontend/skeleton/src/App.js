import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Components/Auth/Login/Login";
import SignIn from "./Components/Auth/Signin/Signin";
import HomePage from "./Components/HomePage/HomePage";
import WelcomePage from "./Components/WelcomePage/WelcomePage";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("userAuthenticated") === "true"
  );

  // Update state if localStorage changes (optional)
  useEffect(() => {
    const checkAuth = () => {
      setIsAuthenticated(localStorage.getItem("userAuthenticated") === "true");
    };
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/signin" element={<SignIn />} />
        <Route
          path="/home"
          element={
            isAuthenticated ? <HomePage /> : <Navigate to="/login" />
          }
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
