import express from 'express';
import User from './User.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Hello World!' });
});

router.get('/login', (req, res) => {
  const { cookies } = req;
  res.json({ cookies });
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username, password });

    if (user) {
      req.session.isLoggedIn = true;
      req.session.user = user;
      res.json({
        message: 'Logged in sucessfully',
      });
    } else {
      res.json({ error: 'Something went wrong' });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      res.json({ error: 'internal server error' });
    } else {
      res.clearCookie('connect.sid');
      res.json({ message: 'logged out successfully' });
    }
  });
});

router.get('/profile', (req, res) => {
  const { isLoggedIn } = req.session;
  if (isLoggedIn) {
    const username = req.session.user.username;
    res.json({ username });
  } else {
    res.json({ error: 'You are not logged in' });
  }
});

export default router;
