import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Auth/Login/Login";
import SignIn from "./Components/Auth/Signin/Signin";
import HomePage from "./Components/HomePage/HomePage"; 
import WelcomePage from "./Components/WelcomePage/WelcomePage"; 
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";

function App() {
  return (
    
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/home" element={<HomePage />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;


// 