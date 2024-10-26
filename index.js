require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { initializeFirebase } = require('./config/firebase');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const protectedRoutes = require('./routes/protected');

initializeFirebase();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Route Middleware
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/protected', protectedRoutes);

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});