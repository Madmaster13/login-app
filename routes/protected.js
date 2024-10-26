const express = require('express');
const router = express.Router();
const { verifyToken, verifyFirebaseToken } = require('../middleware/auth');

router.get('/jwt-protected', verifyToken, (req, res) => {
  res.json({ message: 'Access granted', user: req.user });
});

router.get('/firebase-protected', verifyFirebaseToken, (req, res) => {
  res.json({ message: 'Firebase access granted', user: req.user });
});

module.exports = router;