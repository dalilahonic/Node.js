import express from 'express';

const router = express.Router();

router.use('/login', (req, res) => {
  const { isLoggedIn } = req.body;

  res.setHeader('Set-Cookie', 'loggedIn: true');
  res.send({ message: 'Login successful' });
});

export default router;
