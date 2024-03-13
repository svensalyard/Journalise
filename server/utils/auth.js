const jwt = require('jsonwebtoken');
const User = require('../models/User');

const SECRET_KEY = process.env.SECRET_KEY || 'yourSecretKeyHere';

const signToken = (user) => {
  return jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '1h' });
};

async function verifyUser(token) {
  if (!token) return null;
  
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(decoded.id).select('-password');
    return user ? user.toObject() : null;
  } catch (err) {
    console.error("Error verifying user token:", err);
    return null;
  }
}

module.exports = { verifyUser, signToken };
