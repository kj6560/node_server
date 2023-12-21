// routes/auth.js
import express from 'express';
import { generateToken } from '../authMiddleware.js';
import User from '../models/user.js';


const router = express.Router();

router.post('/login', async (req, res) => {

  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user || !(await user.isValidPassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = generateToken(user);
    res.json({ token });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
