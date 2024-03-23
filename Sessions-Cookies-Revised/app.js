import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import routes from './routes.js';

dotenv.config();

const url = process.env.URL;

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

app.use(routes);

mongoose
  .connect(url)
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => console.log(err));
