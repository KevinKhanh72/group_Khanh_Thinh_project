import { useState } from "react";
import { useUsers } from "./UsersContext.jsx";

const emailRegex = /\S+@\S+\.\S+/; // Regular expression for email validation

export default function AddUser() {
  const { addUser, fetchUsers } = useUsers();

  const [form, setForm] = useState({ name: "", email: "" });
  const [errors, setErrors] = useState({ name: "", email: "" });
  const [saving, setSaving] = useState(false);
  const [serverMsg, setServerMsg] = useState("");

  const onchange = (e) => {
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
      await createUser({ name: form.name.trim(), email: form.email.trim() });
      // Đồng bộ lại danh sách từ server để tránh bất đồng bộ
      if (typeof fetchUsers === "function") await fetchUsers();
      setForm({ name: "", email: "" });
      setServerMsg("Thêm user thành công!");
    } catch {
      setServerMsg("Có lỗi khi tạo user");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="card">
      <h2>Thêm User</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Tên
          <input
            name="name"
            value={form.name}
            onChange={onchange}
            placeholder="Nhập tên"
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </label>

        <label>
          Email
          <input
            name="email"
            value={form.email}
            onChange={onchange}
            placeholder="email@example.com"
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </label>

        <button type="submit" disabled={saving}>
          {saving ? "Đang lưu..." : "Thêm"}
        </button>
        {serverMsg && <div className="note">{serverMsg}</div>}
      </form>
    </div>
  );
}
