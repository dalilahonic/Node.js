const express = require('express');
const { check, body } = require('express-validator/check');

const authController = require('../controllers/auth');

const User = require('../models/user');

const router = express.Router();

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.post(
  '/login',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email adress')
      .normalizeEmail(),
    body('password', 'Password has to be valid')
      .isLength({
        min: 5,
      })
      .isAlphanumeric()
      .trim(),
  ],
  authController.postLogin
);

router.post(
  '/signup',
  [
    check('email')
      .isEmail()
      .withMessage('Please enter a valid email!')
      .custom((value, { req }) => {
        // if (value === 'test@test.com') {
        //   throw new Error(
        //     'This email address is forbidden!'
        //   );
        //   // return false; // go with a default error message
        // }
        // return true;

        return User.findOne({ email: value }).then(
          (userDoc) => {
            if (userDoc) {
              return Promise.reject(
                'E-Mail exists already, please pick a different one.'
              );
            }
          }
        );
      })
      .normalizeEmail(),
    body('password', 'another way to add an error message') // for the body of the request
      .isLength({ min: 5 })
      .withMessage('length')
      .isAlphanumeric()
      .withMessage('only numbers and letters')
      .trim(),
    body('confirmPassword')
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Passwords have to match!');
        }
        return true;
      }),
  ],
  authController.postSignup
);

router.post('/logout', authController.postLogout);

router.get('/reset', authController.getReset);

router.post('/reset', authController.postReset);

router.get('/reset/:token', authController.getNewPassword);

router.post(
  '/new-password',
  authController.postNewPassword
);

module.exports = router;
