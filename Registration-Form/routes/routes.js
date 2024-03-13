import express from 'express';
import {
  getUserInformation,
  postChangePassword,
  postEditUser,
  postLogin,
  postResetPassword,
  postResetPassword2,
  postSignup,
  postVerifyEmail,
} from '../controllers/auth.js';

const router = express.Router();

router.post('/signup', postSignup);

router.post('/login', postLogin);

router.post('/update-user', postEditUser);

router.get('/:username', getUserInformation);

router.post('/verify-email', postVerifyEmail);

router.post('/change-password', postChangePassword);

router.post('/forgot-password', postResetPassword);

router.post('/forgot-password/reset', postResetPassword2);

export default router;
