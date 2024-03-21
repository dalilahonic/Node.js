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
  res.cookie('loggedIn', true);

  res.send({ message: 'Login successful' });
});

export default router;
