import React, { useState } from "react";
import api from "../api.js";
import { useAuth } from "../AuthContext.jsx";

export default function Login() {
  const [form, setForm] = useState({ email:"", password:"" });
  const [msg, setMsg] = useState("");
  const { login } = useAuth();

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      const { data } = await api.post("/api/auth/login", form);
      login(data.token, data.user);
      setMsg("Đăng nhập thành công! Token: " + data.token.slice(0, 24) + "...");
    } catch (err) {
      setMsg(err?.response?.data?.message || "Lỗi đăng nhập");
    }
  };

  return (
    <div style={{maxWidth:420, margin:"24px auto"}}>
      <h2>Login</h2>
      <form onSubmit={onSubmit} style={{display:"grid", gap:10}}>
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={onChange} required />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={onChange} required />
        <button type="submit">Login</button>
      </form>
      {msg && <p style={{marginTop:10}}>{msg}</p>}
    </div>
  );
}
