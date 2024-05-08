import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from './User.js';

dotenv.config();

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const { username } = req.body;

    if (!token) {
      const error = new Error('Unauthorized');
      error.statusCode = 401;
      throw error;
    }

    const verifiedUser = jwt.verify(
      token,
      process.env.SECRET
    );

    const user = await User.findById(verifiedUser.userId);

    if (user.username === username) {
      req.user = verifiedUser;
      next();
    } else {
      const error = new Error('You are not logged in');
      error.statusCode = 401;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

export const isUser = async (req, res, next) => {
  try {
    if (req.user.user_type_id === 0) {
      next();
    } else {
      const error = new Error('Unauthorized');
      error.statusCode = 401;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    if (req.user.user_type_id === 1) {
      next();
    } else {
      const error = new Error('Unauthorized');
      error.statusCode = 401;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};
