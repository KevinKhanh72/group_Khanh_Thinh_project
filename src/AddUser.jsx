// src/AddUser.jsx
import { useState } from "react";
import { useUsers } from "./UsersContext";

const emailRegex = /\S+@\S+\.\S+/;

export default function AddUser() {
  const { addUser } = useUsers();
  const [form, setForm] = useState({ name: "", email: "" });
  const [errors, setErrors] = useState({ name: "", email: "" });
  const [saving, setSaving] = useState(false);
  const [serverMsg, setServerMsg] = useState("");

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((err) => ({ ...err, [name]: "" }));
    setServerMsg("");
  };

  const validate = () => {
    const err = { name: "", email: "" };
    if (!form.name.trim()) err.name = "Name không được để trống";
    if (!form.email.trim()) err.email = "Email không được để trống";
    else if (!emailRegex.test(form.email)) err.email = "Email không hợp lệ";
    setErrors(err);
    return !err.name && !err.email;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerMsg("");
    if (!validate()) return;

    try {
      setSaving(true);
      await addUser({ name: form.name.trim(), email: form.email.trim() });
      setForm({ name: "", email: "" });
      setServerMsg("✅ Thêm user thành công!");
    } catch (e) {
      setServerMsg(e?.response?.data?.message || e.message || "Có lỗi xảy ra!");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="card">
      <h2>Thêm User</h2>
      <form className="form" onSubmit={handleSubmit} noValidate>
        <label>
          Tên
          <input
            name="name"
            placeholder="VD: Nguyen Van A"
            value={form.name}
            onChange={onChange}
          />
          {errors.name && <div className="error">{errors.name}</div>}
        </label>

        <label>
          Email
          <input
            name="email"
            type="email"
            placeholder="VD: a@example.com"
            value={form.email}
            onChange={onChange}
          />
          {errors.email && <div className="error">{errors.email}</div>}
        </label>

        {serverMsg && (
          <div className="error" style={{ background: "#ecfeff", borderColor: "#a5f3fc" }}>
            {serverMsg}
          </div>
        )}

        <button type="submit" disabled={saving}>
          {saving ? "Đang lưu..." : "Thêm"}
        </button>
      </form>
    </div>
  );
}
