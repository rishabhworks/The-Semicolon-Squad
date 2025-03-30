import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Components/Auth/Login/Login";
import SignIn from "./Components/Auth/Signin/Signin";
import HomePage from "./Components/HomePage/HomePage";
import WelcomePage from "./Components/WelcomePage/WelcomePage";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";

function App() {
  const isAuthenticated = localStorage.getItem("userAuthenticated") === "true";

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<SignIn />} />

        <Route
          path="/home"
          element={
            localStorage.getItem("userAuthenticated") === "true"
              ? <HomePage />
              : <Navigate to="/login" />
          }
        />
        </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
