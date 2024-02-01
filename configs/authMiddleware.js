// middlewares/authMiddleware.js
import jwt from 'jsonwebtoken';

export function generateToken(user) {
  return jwt.sign({ id: user.id, username: user.username }, 'keshav_myshop', { expiresIn: '365 days' });
}
export function requireLogin(req, res, next) {
  // Check if req.session and req.session.user exist before accessing properties
  if (req.session && req.session.user && req.session.user.is_loggedin != undefined) {
    if (req.session.user.is_loggedin) {
      next();
    } else {
      res.status(401).json({ message: 'Unauthorized, please log in' });
    }
  } else {
    res.status(401).json({ message: 'Unauthorized, please log in' });
  }
}

export function verifyToken(req, res, next) {
  const token = req.headers['authorization'];
  const tokenValue = token.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Token not provided' });
  }

  jwt.verify(tokenValue, 'keshav_myshop', (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = decoded;
    next();
  });
}
