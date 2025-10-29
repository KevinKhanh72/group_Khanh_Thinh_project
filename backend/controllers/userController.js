let users = [];  // Mảng tạm thời lưu trữ người dùng

// API GET: Lấy tất cả người dùng
exports.getUsers = (req, res) => {
  res.json(users);  // Trả về danh sách người dùng dưới dạng JSON
};

// API POST: Thêm người dùng mới
exports.createUser = (req, res) => {
  const { name, email } = req.body;  // Lấy dữ liệu từ request body

  // Tạo một đối tượng người dùng mới
  const newUser = { id: users.length + 1, name, email };
  users.push(newUser);  // Thêm người dùng vào mảng

  res.status(201).json(newUser);  // Trả về người dùng mới và mã trạng thái 201
};
