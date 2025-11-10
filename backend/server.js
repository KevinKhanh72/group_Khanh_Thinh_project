const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json()); // Cho phép đọc JSON body từ client

// ================= ROUTES ================= //
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/authRoutes');

// Gắn routes vào ứng dụng
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

// ================= DATABASE ================= //
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
