const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const UserStore = require('../models/userStore');

// Local Login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const user = UserStore.findByEmail(email);

  if (!user || user.password !== password) { // In real app, use proper password comparison
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  const { password: _, ...userWithoutPassword } = user;
  res.json({ token, user: userWithoutPassword });
});

// Register new user
router.post('/register', (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ message: 'Email, password, and name are required' });
  }

  if (UserStore.findByEmail(email)) {
    return res.status(400).json({ message: 'Email already registered' });
  }

  const newUser = UserStore.create({
    email,
    password, // In real app, hash the password
    name,
    role: 'user'
  });

  const { password: _, ...userWithoutPassword } = newUser;
  res.status(201).json(userWithoutPassword);
});

module.exports = router;