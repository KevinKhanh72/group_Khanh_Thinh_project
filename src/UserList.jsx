import { useEffect, useState } from "react";
import api from "../api"; // đã tạo src/api.js

export default function UserList({ reloadKey }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    let cancel = false;

    async function fetchUsers() {
      setLoading(true);
      setErr("");
      try {
        const res = await api.get("/users"); // GET http://localhost:3000/users
        if (!cancel) setUsers(res.data || []);
      } catch (e) {
        setErr(e?.response?.data?.message || e.message || "Fetch users failed");
      } finally {
        if (!cancel) setLoading(false);
      }
    }

    fetchUsers();
    return () => { cancel = true; };
  }, [reloadKey]);

  if (loading) return <div className="card">Đang tải danh sách user…</div>;
  if (err) return <div className="card error">Lỗi: {err}</div>;
  if (!users.length) return <div className="card">Chưa có user nào.</div>;

  return (
    <div className="card">
      <h2>Danh sách User</h2>
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Tên</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, idx) => (
            <tr key={u.id ?? idx}>
              <td>{u.id ?? idx + 1}</td>
              <td>{u.name ?? ""}</td>
              <td>{u.email ?? ""}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
