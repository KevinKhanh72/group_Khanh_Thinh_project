import React, { useState } from "react";
import api from "../api.js";

export default function Signup() {
  const [form, setForm] = useState({ name:"", email:"", password:"" });
  const [msg, setMsg] = useState("");

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      const { data } = await api.post("/api/auth/signup", form);
      setMsg("Đăng ký thành công cho: " + data.user.email);
    } catch (err) {
      setMsg(err?.response?.data?.message || "Lỗi đăng ký");
    }
  };

  return (
    <div style={{maxWidth:420, margin:"24px auto"}}>
      <h2>Sign Up</h2>
      <form onSubmit={onSubmit} style={{display:"grid", gap:10}}>
        <input name="name" placeholder="Name" value={form.name} onChange={onChange} required />
        <input name="email" placeholder="Email" type="email" value={form.email} onChange={onChange} required />
        <input name="password" placeholder="Password" type="password" value={form.password} onChange={onChange} required />
        <button type="submit">Create account</button>
      </form>
      {msg && <p style={{marginTop:10}}>{msg}</p>}
    </div>
  );
}
