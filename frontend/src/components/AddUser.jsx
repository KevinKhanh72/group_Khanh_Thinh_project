import { useState } from "react";
import axios from "axios";

export default function AddUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const addUser = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return alert("Nhập đủ tên và email");
    try {
      await axios.post("http://localhost:4000/users", { name, email });
      alert("Thêm user thành công!");
      setName("");
      setEmail("");
    } catch (err) {
      console.error(err);
      alert("POST /users lỗi. Kiểm tra JSON Server!");
    }
  };

  return (
    <form onSubmit={addUser}>
      <h2>Thêm User</h2>
      <input
        placeholder="Tên"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br /><br />
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br /><br />
      <button type="submit">Thêm</button>
    </form>
  );
}
