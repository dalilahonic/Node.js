import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

export const postSignup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const doesEmailExist = await User.findOne({
      email,
    });
    const doesUsernameExist = await User.findOne({
      username,
    });

    if (doesEmailExist && doesEmailExist.isVerified) {
      return res.json({
        error: 'User with this email already exists',
      });
    } else if (
      doesUsernameExist &&
      doesUsernameExist.isVerified
    ) {
      return res.json({
        error: 'User with this username already exists',
      });
    } else if (username.length < 5) {
      return res.json({
        error: 'Username must be longer than 5 characters',
      });
    } else if (
      !email.includes('@') ||
      !email.includes('.') ||
      email.length < 6 ||
      email.split('@')[1].length < 3
    ) {
      return res.json({
        error: 'Please enter a valid email!',
      });
    } else if (password.length < 7) {
      return res.json({
        error: 'Password must be longer than 7 characters',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const verificationToken = uuidv4();

    const newUser = await new User({
      username,
      email,
      password: hashedPassword,
      verificationToken,
    });

    await newUser.save();

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
      subject: 'Verify your email adress',
      html: `Click <a href="http://localhost:3000/verify-email/${verificationToken}">here</a> to verify your email address.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        res.status(500).json({
          error:
            'Failed to send verification email' + error,
        });
      } else {
        res.status(200).json({
          message: 'Verification email has been sent ',
        });
      }
    });
  } catch (err) {
    res.json({ error: 'Failed to sing up' });
  }
};

export const postVerifyEmail = async (req, res) => {
  const { token } = req.body;

  const user = await User.findOne({
    verificationToken: token,
  });

  if (!user) {
    return res.json({ error: 'Failed to verify email' });
  } else {
    if (user.verificationToken === token) {
      user.isVerified = true;
      user.verificationToken = undefined;
      await user.save();
      res.json({ message: 'Email verified successfully' });
    }
  }
};

export const postLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user.isVerified) {
      return res.json({
        error: 'Wrong email or password ',
      });
    }

    if (user) {
      const paswordMatch = await bcrypt.compare(
        password,
        user.password
      );

      const username = user.username;

      paswordMatch
        ? res.json({ username, email })
        : res.json({ error: 'Wrong email or password' });
    } else {
      res.json({ error: `Wrong email or password` });
    }
  } catch (err) {
    console.log(err);
  }
};

export const getUserInformation = async (req, res) => {
  const username = req.params.username;

  const user = await User.findOne({ username });

  if (!user) {
    res.status(404).json({ error: 'User not found' });
  } else {
    res.json({
      username: user.username,
      email: user.email,
    });
  }
};

export const postEditUser = async (req, res) => {
  const {
    username: newUsername,
    email,
    oldUsername,
  } = req.body;

  const user = await User.findOne({
    username: oldUsername,
  });

  if (!user) {
    return res.json({ error: 'User not found' });
  }

  user.username = newUsername;
  user.email = email;
  await user.save();

  res.json({ username: user.username, email: user.email });
};

export const postChangePassword = async (req, res) => {
  const { username, oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    return res.json({
      error: 'You must enter all fields!',
    });
  }

  try {
    const user = await User.findOne({ username });

    const passwordMatch = await bcrypt.compare(
      oldPassword,
      user.password
    );

    const isNewPasswordIdentical = await bcrypt.compare(
      newPassword,
      user.password
    );

    if (newPassword.length < 7) {
      return res.json({
        error: 'Password must be longer than 7 characters',
      });
    }

    if (!passwordMatch) {
      return res.json({ error: 'Password is not correct' });
    }

    if (isNewPasswordIdentical) {
      return res.json({
        error:
          'New password must be different from the old one!',
      });
    }

    const hashedPassword = await bcrypt.hash(
      newPassword,
      12
    );

    user.password = hashedPassword;
    await user.save();
    return res.json({
      message: 'Password updated successfully!',
    });
  } catch (err) {
    if (err) {
      res.json({ err: 'Failed to update password' });
    }
  }
};

export const postResetPassword = async (req, res) => {
  const { email } = req.body;

  const verificationToken = uuidv4();

  const user = await User.findOne({ email });

  user.verificationToken = verificationToken;
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
    subject: 'Reset your password',
    html: `Click <a href="http://localhost:3000/reset-password/${verificationToken}"> here </a>to reset your password `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res
        .status(500)
        .json({ error: 'Failed to send email!' });
    } else {
      res.status(200).json({
        message: 'Email has been sent',
      });
    }
  });
};

export const postResetPassword2 = async (req, res) => {
  const { token, newPassword } = req.body;

  const user = await User.findOne({
    verificationToken: token,
  });

  if (user) {
    const hashedPassword = await bcrypt.hash(
      newPassword,
      12
    );
    user.password = hashedPassword;
    user.verificationToken = undefined;
    await user.save();
    return res.json({
      message: 'Password changed',
      username: user.username,
    });
  } else {
    return res.json({ error: 'Something went wrong' });
  }
};
