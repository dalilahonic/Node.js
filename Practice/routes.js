import express from 'express';
import { validationResult, body } from 'express-validator';
import rateLimit from 'express-rate-limit';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import {
  isUser,
  verifyToken,
  isAdmin,
} from './middleware.js';

dotenv.config();

import Message from './schema.js';
import User from './User.js';

const router = express.Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit 5 request per windowMs
  message:
    'Too many login attempts, please try again later  ',
});

router.get('/', (_, res) => {
  res.json({ message: 'Hello World' });
});

// http://localhost:9000/messages
// http://localhost:9000/messages?category=important&search=urgent
router.get('/messages', async (req, res, next) => {
  try {
    let filter = {};

    if (req.query.search) {
      const searchTerm = req.query.search;
      filter.$or = [
        { title: { $regex: searchTerm, $options: 'i' } },
        { body: { $regex: searchTerm, $options: 'i' } },
      ];
    }

    if (req.query.category) {
      const category = req.query.category;
      filter.category = category;
    }

    const messages = await Message.find(filter);

    res.status(200).json({ messages, filter });
  } catch (error) {
    next(error);
  }
});

router.get('/message/:id', async (req, res, next) => {
  try {
    const message = await Message.findById(req.params.id);

    if (!message) {
      const notFoundError = new Error('Messsage not found');
      notFoundError.statusCode = 404;
      throw notFoundError;
    }

    res.status(200).json({ message });
  } catch (error) {
    next(error);
  }
});

router.post(
  '/new-message',
  verifyToken,
  isAdmin,
  async (req, res, next) => {
    try {
      const { title, body, category } = req.body;

      if (!title || !body) {
        const validationError = new Error(
          'Title and body are required'
        );
        validationError.statusCode = 400;
        throw validationError;
      }

      const newMessage = new Message({
        title,
        body,
        category,
      });

      await newMessage.save();

      res.status(201).json({ message: newMessage });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/message/:id/edit',
  verifyToken,
  isAdmin,
  async (req, res, next) => {
    try {
      const { title, body, category } = req.body;
      const id = req.params.id;

      const message = await Message.findById(id);

      message.title = title;
      message.body = body;
      message.category = category;

      await message.save();

      res.json({ message: 'Message updated successfully' });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/message/:id/delete',
  verifyToken,
  isAdmin,
  async (req, res, next) => {
    try {
      const id = req.params.id;
      await Message.findByIdAndDelete(id);

      res.json({ message: 'Message deleted successfully' });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/register',
  [
    body('username')
      .trim()
      .notEmpty()
      .withMessage('Username is required')
      .isLength({ min: 3 })
      .withMessage(
        'Username must be at least 3 characters long'
      )
      .custom(async (value) => {
        const existingUser = await User.findOne({
          username: value,
        });

        if (existingUser) {
          const existingUsernameError = new Error(
            'Username already taken'
          );
          existingUsernameError.statusCode = 400;
          throw existingUsernameError;
        }

        return true;
      })
      .escape(),
    body('email')
      .normalizeEmail()
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Invalid email adress')
      .custom(async (value) => {
        const existingUser = await User.findOne({
          email: value,
        });

        if (existingUser) {
          const existingEmailError = new Error(
            'Email already exists'
          );
          existingEmailError.statusCode = 400;
          throw existingEmailError;
        }

        return true;
      }),
    body('password')
      .notEmpty()
      .withMessage('Password is required')
      .isLength({ min: 6 })
      .withMessage(
        'Password must be at least 6 characters long'
      )
      .matches(/\d/)
      .withMessage(
        'Password mush contain at least one digit'
      )
      .matches(/[a-zA-Z]/)
      .withMessage(
        'Password must contain at least one letter'
      )
      .custom((value) => {
        if (value.toLowerCase().includes('password')) {
          throw new Error(
            'Password cannot contain the word "password"'
          );
        }
        return true;
      }),
    body('confirmPassword').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords do not match');
      }
      return true;
    }),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        const validationError = new Error(
          'Validation error'
        );
        validationError.statusCode = 400;
        validationError.errors = errors.array();

        throw validationError;
      }
      const { username, email, password } = req.body;

      const hashedPassword = await bcrypt.hash(
        password,
        12
      );

      const verificationToken = crypto
        .randomBytes(32)
        .toString('hex');

      await User.create({
        username,
        email,
        password: hashedPassword,
        verificationToken,
      });

      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: 'dalilahonic1@gmail.com',
          pass: process.env.APP_PASSWORD,
        },
      });

      const mailOptions = {
        from: 'dalilahonic1@gmail.com',
        to: email,
        subject: 'Emial Verification',
        html: `<p>Click <a href="http://localhost:9000/verify/${verificationToken}">here</a> to verify your email.</p>`,
      };

      await transporter.sendMail(mailOptions);

      res
        .status(201)
        .json({ message: 'Check email to verify account' });
    } catch (error) {
      next(error);
    }
  }
);

router.get('/verify/:token', async (req, res, next) => {
  try {
    const { token } = req.params;

    const user = await User.findOne({
      verificationToken: token,
    });

    if (!user) {
      const noUserError = new Error('No user found');
      throw noUserError;
    }

    user.isVerified = true;
    user.verificationToken = undefined;

    await user.save();

    res
      .status(200)
      .json({ message: 'Email verified successfully' });
  } catch (error) {
    next(error);
  }
});

router.post(
  '/login',
  loginLimiter,
  [
    body('email')
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Invalid email address'),
    body('password')
      .notEmpty()
      .withMessage('Password is required'),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        const validationError = new Error(
          'Validation error'
        );
        validationError.statusCode = 400;
        validationError.errors = errors;
        throw validationError;
      }

      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        throw new Error('User not found');
      }

      if (!user.isVerified) {
        throw new Error('Email not verified');
      }

      const passwordMatch = await bcrypt.compare(
        password,
        user.password
      );

      if (!passwordMatch) {
        throw new Error('Invalid password');
      }

      const token = jwt.sign(
        {
          userId: user._id,
          user_type_id: req.body.user_type_id || 0,
        },
        process.env.SECRET,
        { expiresIn: '1h' }
      );

      res.status(200).json({
        message: 'Login successful',
        token,
        username: user.username,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/profile',
  verifyToken,
  isUser,
  async (req, res, next) => {
    try {
      const user = await User.findById(req.userId);
      if (!user) {
        throw new Error('User not found');
      }

      res.status(200).json({ username: user.username });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/profile/update',
  verifyToken,
  isUser,
  [
    body('username')
      .trim()
      .notEmpty()
      .withMessage('Username is required')
      .isLength({ min: 3 })
      .withMessage(
        'Username must be at least 3 characters long'
      ),
    body('password')
      .notEmpty()
      .withMessage('Password is required'),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const error = new Error('Validation error');
        error.statusCode = 400;
        error.errors = errors.array();
      }

      const { username, password } = req.body;
      const user = await User.findById(req.userId);

      if (!user) {
        throw new Error('User not found');
      }

      if (username && user.username !== username) {
        user.username = username;
      }

      const passwordMatch = bcrypt.compare(
        password,
        user.password
      );

      if (!passwordMatch) {
        const hashedPw = bcrypt.hash(password, 12);
        user.password = hashedPw;
      } else {
        throw new Error('You must change your password');
      }

      await user.save();

      res
        .status(200)
        .json({ message: 'Profile updated succesfully' });
    } catch (error) {
      next(error);
    }
  }
);

router.post('/reset', async (req, res, next) => {
  try {
    const { username } = req.body;

    const token = await crypto
      .randomBytes(32)
      .toString('hex');

    const user = await User.findOne({ username });

    user.verificationToken = token;

    await user.save();

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'dalilahonic1@gmail.com',
        pass: process.env.APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: 'dalilahonic1@gmail.com',
      to: email,
      subject: 'Emial Verification',
      html: `<p>Click <a href="http://localhost:9000/reset/${verificationToken}">here</a> to verify your email.</p>`,
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: 'Check your email' });
  } catch (error) {
    next(error);
  }
});

router.get('/reset/:token', async (req, res, next) => {
  try {
    const token = req.params.token;
    const { password } = req.body;

    const user = await User.findOne({
      verificationToken: token,
    });

    const newPassword = await bcrypt.hash(password, 12);

    user.password = newPassword;
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    next(error);
  }
});

export default router;
