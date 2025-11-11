let users = []; // Mảng lưu người dùng tạm thời

// 📋 API GET: Lấy tất cả người dùng
exports.getUsers = (req, res) => {
  res.json(users); // Trả về danh sách người dùng
};

// ➕ API POST: Thêm người dùng mới
exports.createUser = (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ msg: "Thiếu thông tin name hoặc email" });
  }

  // Tạo user mới
  const newUser = {
    id: users.length + 1,
    name,
    email,
    role: "user"
  };

  users.push(newUser);
  res.status(201).json({ msg: "Thêm người dùng thành công", newUser });
};

// 🗑️ API DELETE: Xóa người dùng theo id
exports.deleteUser = (req, res) => {
  const id = parseInt(req.params.id);
  users = users.filter((user) => user.id !== id);
  res.json({ msg: `Đã xóa người dùng có id = ${id}` });
};

// 🛠️ API PUT: Cập nhật vai trò người dùng (role)
exports.updateUserRole = (req, res) => {
  const id = parseInt(req.params.id);
  const { role } = req.body;
  const user = users.find((u) => u.id === id);

  if (!user) return res.status(404).json({ msg: "Không tìm thấy người dùng" });

  user.role = role || user.role;
  res.json({ msg: "Cập nhật vai trò thành công", user });
};
