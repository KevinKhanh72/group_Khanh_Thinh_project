const express = require('express');
const router = express.Router();

// Route GET /api/users
router.get('/users', (req, res) => {
  res.json([  // Trả về mảng người dùng
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Doe', email: 'jane@example.com' }
  ]);
});

module.exports = router;
