import express from 'express';
import routes from './routes/routes.js';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import rateLimit from 'express-rate-limit';

dotenv.config();

const url = process.env.URL;

const app = express();

app.use(express.json());
app.use(cors());

const loginRateLimit = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message:
    'Too many login attempts, please try again later.',
});

app.use('/login', loginRateLimit);

app.use(routes);

mongoose.connect(url).then(() => {
  console.log('Connected to MongoDB');
  app.listen(5000, () => {
    console.log('server is running');
  });
});
