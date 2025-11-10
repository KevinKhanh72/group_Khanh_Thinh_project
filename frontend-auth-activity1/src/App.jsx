import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import NavBar from "./components/NavBar.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";

function Home() {
  return (
    <div style={{ padding: 24 }}>
      <h2>Activity 1 - Frontend</h2>
      <p>API URL: {import.meta.env.VITE_API_URL}</p>
      <p>Đi tới <Link to="/signup">Sign Up</Link> hoặc <Link to="/login">Login</Link>.</p>
    </div>
  );
}

export default function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}
