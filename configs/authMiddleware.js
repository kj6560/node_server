// middlewares/authMiddleware.js
import jwt from 'jsonwebtoken';

export function generateToken(user) {
  return jwt.sign({ id: user.id, username: user.username }, 'keshav_univ', { expiresIn: '365 days' });
}

export function verifyToken(req, res, next) {
  const token = req.headers['authorization'];
  const tokenValue = token.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Token not provided' });
  }

  jwt.verify(tokenValue, 'keshav_univ', (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = decoded;
    next();
  });
}
