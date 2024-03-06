import express from 'express';
import routes from './routes/routes.js';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const url = process.env.URL;

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

mongoose.connect(url).then(() => {
  console.log('Connected to MongoDB');
  app.listen(5000, () => {
    console.log('server is running');
  });
});
