// ================== IMPORT MODULES ================== //
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// ================== APP INIT ================== //
const app = express();
app.use(cors());
app.use(express.json()); // Cho phép đọc JSON body từ client

// ================== ROUTES IMPORT ================== //
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/authRoutes');
const trainerRoutes = require('./routes/trainer'); // 👈 Route cho Trainer
const profileRoutes = require("./routes/profile");

// ================== USE ROUTES ================== //
app.use('/api/users', userRoutes);      // Quản lý người dùng
app.use('/api/auth', authRoutes);       // Đăng ký / Đăng nhập
app.use('/api/trainers', trainerRoutes); // Quản lý huấn luyện viên
app.use("/api/profile", profileRoutes);


// ================== DATABASE CONNECT ================== //
// mongoose.connect(process.env.MONGO_URL)
//   .then(() => console.log('✅ MongoDB Connected'))
//   .catch(err => console.error('❌ MongoDB connection error:', err));

// ================== ROOT ROUTE ================== //
app.get('/', (req, res) => {
  res.send('🎯 Server is running successfully!');
});

// ================== SERVER START ================== //
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
                            