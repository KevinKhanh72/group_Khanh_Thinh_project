import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext.jsx";
import api from "../api.js";

export default function NavBar() {
  const { token, user, logout } = useAuth();
  const handleLogout = async () => {
    try { await api.post("/api/auth/logout"); } catch {}
    logout();
  };

  return (
    <nav style={{display:"flex", gap:12, padding:12, borderBottom:"1px solid #ddd"}}>
      <Link to="/">Home</Link>
      <Link to="/signup">Sign Up</Link>
      <Link to="/login">Login</Link>
      {token && <button onClick={handleLogout}>Logout</button>}
      <div style={{marginLeft:"auto"}}>{user ? `👋 ${user.name}` : "Not logged in"}</div>
    </nav>
  );
}
