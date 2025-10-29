// src/UsersContext.jsx
import { createContext, useContext, useEffect, useState, useCallback } from "react";
import api from "./api";

const UsersContext = createContext();

export function UsersProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get("/users");
      setUsers(res.data || []);
    } catch (e) {
      setError(e?.response?.data?.message || e.message || "Fetch users failed");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  const addUser = async (payload) => {
    const res = await api.post("/users", payload);
    // Thêm lên đầu danh sách để thấy ngay
    setUsers(prev => [res.data, ...prev]);
    return res.data;
  };

  const updateUser = async (id, payload) => {
    const res = await api.put(`/users/${id}`, payload);
    setUsers(prev => prev.map(u => (u._id === id || u.id === id) ? res.data : u));
    return res.data;
  };

  const deleteUser = async (id) => {
    await api.delete(`/users/${id}`);
    setUsers(prev => prev.filter(u => (u._id ?? u.id) !== id));
  };

  return (
    <UsersContext.Provider value={{
      users, loading, error,
      fetchUsers, addUser, updateUser, deleteUser
    }}>
      {children}
    </UsersContext.Provider>
  );
}

export const useUsers = () => useContext(UsersContext);
