import { useState } from "react";
import api from "./api";

export default function AddUser({ onUserAdded }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErr("");
    try {
      await api.post("/api/users", { name, email });
      setName("");
      setEmail("");
      onUserAdded && onUserAdded();
    } catch (e) {
      setErr(e?.response?.data?.message || e.message || "Add user failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>Thêm User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Tên:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Đang thêm..." : "Thêm"}
        </button>
        {err && <div className="error">Lỗi: {err}</div>}
      </form>
    </div>
  );
}
