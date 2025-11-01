const express = require('express');
const app = express();

// Middleware để xử lý JSON body
app.use(express.json());

// Định nghĩa route GET cho '/'
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
