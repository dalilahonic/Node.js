import express from 'express';
import {
  getUserInformation,
  postEditUser,
  postLogin,
  postSignup,
  postVerifyEmail,
} from '../controllers/auth.js';

const router = express.Router();

router.post('/signup', postSignup);

router.post('/login', postLogin);

router.post('/update-user', postEditUser);

router.get('/:username', getUserInformation);

router.post('/verify-email', postVerifyEmail);

export default router;
