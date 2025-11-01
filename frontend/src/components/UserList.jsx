import { useEffect, useState } from "react";
import axios from "axios";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [err, setErr] = useState("");

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axios.get("http://localhost:4000/users");
        setUsers(Array.isArray(res.data) ? res.data : []);
        setErr("");
      } catch (e) {
        console.error(e);
        setErr("Không tải được danh sách user. Kiểm tra JSON Server!");
      }
    };
    getUsers();
  }, []);

  return (
    <div>
      <h2>Danh sách User</h2>
      {err && <p style={{ color: "red" }}>{err}</p>}
      <table border="1" cellPadding="10">
        <thead>
          <tr><th>ID</th><th>Tên</th><th>Email</th></tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
