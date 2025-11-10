import React, { createContext, useContext, useState, useEffect } from "react";
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(()=> localStorage.getItem("token") || "");
  const [user, setUser] = useState(()=> {
    try { return JSON.parse(localStorage.getItem("user") || "null"); } catch { return null; }
  });

  useEffect(()=> { token ? localStorage.setItem("token", token) : localStorage.removeItem("token"); }, [token]);
  useEffect(()=> { user ? localStorage.setItem("user", JSON.stringify(user)) : localStorage.removeItem("user"); }, [user]);

  const login = (tk, usr)=> { setToken(tk); setUser(usr); };
  const logout = ()=> { setToken(""); setUser(null); };

  return <AuthContext.Provider value={{ token, user, login, logout }}>{children}</AuthContext.Provider>;
}
export const useAuth = ()=> useContext(AuthContext);
