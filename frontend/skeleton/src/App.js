import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Auth/Login/Login";
import SignIn from "./Components/Auth/Signin/Signin";
import HomePage from "./Components/HomePage/HomePage"; // Import HomePage
import WelcomePage from "./Components/WelcomePage/WelcomePage"; // Import WelcomePage

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/home" element={<HomePage />} /> {/* Ensure this route is present */}
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


// 