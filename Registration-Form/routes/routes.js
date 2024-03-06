import express from 'express';

const router = express.Router();

import {
  postLogin,
  postSignup,
} from '../controllers/auth.js';

router.get('/', (req, res) => {
  res.json({ text: 'Hello world!' });
});

router.post('/signup', postSignup);

router.post('/login', postLogin);
export default router;
