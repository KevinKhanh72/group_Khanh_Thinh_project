const express = require("express");
const router = express.Router();
const User = require("../models/User");
const verifyToken = require("../middleware/verifyToken");

// 📋 GET /api/profile → Lấy thông tin người dùng
router.get("/", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ msg: "Không tìm thấy người dùng" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: "Lỗi server", error: err.message });
  }
});

// 🛠 PUT /api/profile →   Cập nhật thông tin
router.put("/", verifyToken, async (req, res) => {
  try {
    const { name, gender, city, bio, avatar } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { name, gender, city, bio, avatar },
      { new: true }
    ).select("-password");

    if (!updatedUser)
      return res.status(404).json({ msg: "Không tìm thấy người dùng" });

    res.json({ msg: "Cập nhật thông tin thành công!", user: updatedUser });
  } catch (err) {
    res.status(500).json({ msg: "Lỗi server", error: err.message });
  }
});

module.exports = router;
