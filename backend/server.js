const express = require('express');
const app = express();

// Import routes từ file user.js trong thư mục routes
const userRoutes = require('./routes/user');

app.use(express.json());  // Cấu hình để nhận dữ liệu JSON từ client

// Sử dụng route với prefix '/api'
app.use('/api', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
