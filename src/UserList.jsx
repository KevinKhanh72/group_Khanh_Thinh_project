// src/UserList.jsx
import { useState } from "react";
import { useUsers } from "./UsersContext";

export default function UserList() {
  const { users, loading, error, updateUser, deleteUser } = useUsers();

  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", email: "" });
  const [savingEdit, setSavingEdit] = useState(false);

  const idOf = (u) => u?._id ?? u?.id;

  const handleEdit = (user) => {
    setEditingId(idOf(user));
    setEditForm({ name: user?.name || "", email: user?.email || "" });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({ name: "", email: "" });
    setSavingEdit(false);
  };

  const submitEdit = async (e) => {
    e.preventDefault();
    if (!editingId) return;
    if (!editForm.name.trim() || !editForm.email.trim()) {
      alert("Vui lòng nhập đủ Tên và Email.");
      return;
    }
    try {
      setSavingEdit(true);
      await updateUser(editingId, { ...editForm });
      cancelEdit();
    } catch (e) {
      alert(e?.response?.data?.message || e.message || "Update failed");
    } finally {
      setSavingEdit(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      if (!id) return;
      if (!window.confirm("Bạn có chắc muốn xóa user này?")) return;
      await deleteUser(id);
      if (editingId === id) cancelEdit();
    } catch (e) {
      alert(e?.response?.data?.message || e.message || "Delete failed");
    }
  };

  if (loading) return <div className="card">Đang tải danh sách user…</div>;
  if (error) return <div className="card error">Lỗi: {error}</div>;
  if (!users.length) return <div className="card">Chưa có user nào.</div>;

  return (
    <div className="card">
      <h2>Danh sách User</h2>

      {editingId && (
        <form className="form" onSubmit={submitEdit} style={{ marginBottom: 12 }}>
          <strong>Đang sửa:</strong>{" "}
          <span style={{ opacity: 0.8 }}>{editingId}</span>
          <label>
            Tên
            <input
              name="name"
              value={editForm.name}
              onChange={(e) => setEditForm((f) => ({ ...f, name: e.target.value }))}
            />
          </label>
          <label>
            Email
            <input
              name="email"
              type="email"
              value={editForm.email}
              onChange={(e) => setEditForm((f) => ({ ...f, email: e.target.value }))}
            />
          </label>
          <div style={{ display: "flex", gap: 8 }}>
            <button type="submit" disabled={savingEdit}>
              {savingEdit ? "Đang lưu..." : "Lưu thay đổi"}
            </button>
            <button type="button" onClick={cancelEdit}>Hủy</button>
          </div>
        </form>
      )}

      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Tên</th>
            <th>Email</th>
            <th style={{ width: 180 }}>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, idx) => {
            const uid = idOf(u);
            return (
              <tr key={uid ?? idx}>
                <td>{idx + 1}</td>
                <td>{u.name ?? ""}</td>
                <td>{u.email ?? ""}</td>
                <td>
                  <button onClick={() => handleEdit(u)} style={{ marginRight: 8 }}>
                    Sửa
                  </button>
                  <button onClick={() => handleDelete(uid)}>Xóa</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
