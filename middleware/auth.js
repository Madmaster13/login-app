const jwt = require('jsonwebtoken');
const admin = require('firebase-admin');
const UserStore = require('../models/userStore');

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = UserStore.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

const verifyFirebaseToken = async (req, res, next) => {
  const firebaseToken = req.headers.authorization?.split(' ')[1];
  
  if (!firebaseToken) {
    return res.status(401).json({ message: 'No Firebase token provided' });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(firebaseToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid Firebase token' });
  }
};

module.exports = { verifyToken, verifyFirebaseToken };