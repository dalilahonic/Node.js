import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Hello World!' });
});

router.get('/login', (req, res) => {
  const { cookies } = req;
  // console.log(req.session.isLoggedIn); // true
  res.json({ cookies });
});

router.post('/login', (req, res) => {
  const { isLoggedIn } = req.body;
  res.cookie('loggedIn', isLoggedIn);
  req.session.isLoggedIn = true;
  res.json({ message: 'Logged in sucessfully' });
});

router.post('/logout', (req, res) => {
  const { isLoggedIn } = req.body;
  res.cookie('loggedIn', isLoggedIn);

  req.session.destroy();

  res.json({ message: 'Logged out sucessfully' });
});

export default router;
