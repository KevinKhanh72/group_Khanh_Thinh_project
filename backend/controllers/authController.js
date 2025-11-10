const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // sẽ tạo file này ở bước kế tiếp nếu chưa có

// [POST] /signup
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const exist = await User.findOne({ email });
    if (exist) return res.status(400).json({ msg: "Email đã tồn tại" });

    const hashed = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashed });
    await newUser.save();

    res.status(201).json({ msg: "Đăng ký thành công", user: newUser });
  } catch (err) {
    res.status(500).json({ msg: "Lỗi server", err });
  }
};

// [POST] /login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "Không tìm thấy tài khoản" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ msg: "Sai mật khẩu" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ msg: "Đăng nhập thành công", token });
  } catch (err) {
    res.status(500).json({ msg: "Lỗi server", err });
  }
};

// [POST] /logout
exports.logout = (req, res) => {
  res.json({ msg: "Đăng xuất thành công – hãy xóa token phía client" });
};
