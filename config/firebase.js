const admin = require('firebase-admin');
const serviceAccount = require('../firebase-config.json');

const initializeFirebase = () => {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
};

module.exports = { initializeFirebase };