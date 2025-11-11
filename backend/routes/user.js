const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// 📋 Lấy danh sách người dùng
router.get("/", userController.getUsers);

// ➕ Thêm người dùng
router.post("/", userController.createUser);

// 🗑️ Xóa người dùng
router.delete("/:id", userController.deleteUser);

// 🛠️ Cập nhật role người dùng
router.put("/:id/role", userController.updateUserRole);

module.exports = router;
