const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5001;

// Connect to DB
connectDB();

// Middleware
app.use(express.json()); // For parsing application/json

// Basic health check route
app.get('/health', (req, res) => {
  res.status(200).json({ message: 'Server is up and running' });
});

// Starting the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
