const express = require("express");
const router = express.Router();

// Mảng tạm chứa danh sách trainer
let trainers = [
  { id: 1, name: "John", sport: "Gym" },
  { id: 2, name: "Anna", sport: "Yoga" },
];

// 📋 GET: Lấy danh sách trainer
router.get("/", (req, res) => {
  res.json(trainers);
});

// ➕ POST: Thêm trainer mới
router.post("/", (req, res) => {
  const { name, sport } = req.body;
  const newTrainer = { id: trainers.length + 1, name, sport };
  trainers.push(newTrainer);
  res.status(201).json({ msg: "Thêm trainer thành công", newTrainer });
});

module.exports = router;
