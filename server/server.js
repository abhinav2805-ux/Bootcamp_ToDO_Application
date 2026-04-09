const express = require('express');
const cors = require('cors');
require('dotenv').config();

const todoRoutes = require('./routes/todoRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', todoRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ message: 'Server is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
