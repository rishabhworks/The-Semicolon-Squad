import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../src/Conponents/Auth/Login/Login";
import SignIn from "../src/Conponents/Auth/Signin/Signin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
// 