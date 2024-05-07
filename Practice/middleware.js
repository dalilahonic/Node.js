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

    const decoded = jwt.verify(token, process.env.SECRET);

    const user = await User.findById(decoded.userId);

    if (user.username === username) {
      req.userId = decoded.userId;
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
