import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Hello World!' });
});

router.get('/login', (req, res) => {
  const { cookies } = req;
  res.json({ cookies });
});

router.post('/login', (req, res) => {
  const { isLoggedIn } = req.body;
  res.cookie('loggedIn', isLoggedIn);
  res.json({ message: 'Logged in sucessfully' });
});

router.post('/logout', (req, res) => {
  const { isLoggedIn } = req.body;
  res.cookie('loggedIn', isLoggedIn);
  res.json({ message: 'Logged out sucessfully' });
});

export default router;
