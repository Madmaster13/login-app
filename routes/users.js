const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const UserStore = require('../models/userStore');

// Get user profile
router.get('/profile', verifyToken, (req, res) => {
  const { password, ...userWithoutPassword } = req.user;
  res.json(userWithoutPassword);
});

// Update user profile
router.put('/profile', verifyToken, (req, res) => {
  const { name } = req.body;
  const updatedUser = UserStore.update(req.user.id, { name });
  
  if (!updatedUser) {
    return res.status(404).json({ message: 'User not found' });
  }

  const { password, ...userWithoutPassword } = updatedUser;
  res.json(userWithoutPassword);
});

// Get all users (could add admin middleware in real app)
router.get('/', verifyToken, (req, res) => {
  const users = UserStore.list();
  res.json(users);
});

module.exports = router;