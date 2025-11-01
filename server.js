// server.js (backend chạy ở http://localhost:3000)
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || true,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Kết nối MongoDB
const { MONGODB_URI = "mongodb://127.0.0.1:27017/usersdb", PORT = 3000 } = process.env;

// In thêm debug info
console.log("🔄 Connecting to MongoDB at:", MONGODB_URI);

// Thêm options và timeout
const mongooseOpts = {
  autoIndex: true,
  serverSelectionTimeoutMS: 5000,
  connectTimeoutMS: 10000,
  socketTimeoutMS: 45000,
};

mongoose
  .connect(MONGODB_URI, mongooseOpts)
  .then(() => {
    console.log("✅ MongoDB connected successfully");
    mongoose.connection.on('error', err => {
      console.error('MongoDB runtime error:', err);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:");
    console.error("Error details:", err);
    process.exit(1);
  });

// Model User
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true, unique: true },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

// ===== ROUTES =====

// Lấy danh sách
app.get("/users", async (_req, res) => {
  const users = await User.find().sort({ createdAt: -1 }).lean();
  res.json(users);
});

// Thêm mới
app.post("/users", async (req, res) => {
  try {
    const { name, email } = req.body || {};
    if (!name?.trim() || !email?.trim()) return res.status(400).json({ message: "name & email are required" });
    const created = await User.create({ name, email });
    res.status(201).json(created);
  } catch (e) {
    if (e?.code === 11000) return res.status(409).json({ message: "Email already exists" });
    res.status(500).json({ message: e?.message || "Server error" });
  }
});

// Sửa (PUT)
app.put("/users/:id", async (req, res) => {
  try {
    const { id } = req.params; // chú ý: dùng _id của MongoDB
    const { name, email } = req.body || {};
    if (!name?.trim() || !email?.trim()) return res.status(400).json({ message: "name & email are required" });
    const updated = await User.findByIdAndUpdate(id, { name, email }, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ message: "User not found" });
    res.json(updated);
  } catch (e) {
    if (e?.code === 11000) return res.status(409).json({ message: "Email already exists" });
    res.status(500).json({ message: e?.message || "Server error" });
  }
});

// Xóa (DELETE)
app.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await User.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "User not found" });
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ message: e?.message || "Server error" });
  }
});

// Thêm error handler cho server.listen
const server = app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} is already in use. Please choose another port or stop the other process.`);
  } else {
    console.error('❌ Server error:', err);
  }
  process.exit(1);
});
