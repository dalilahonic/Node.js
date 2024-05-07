import express from 'express';
import routes from './routes.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const URI = process.env.URI;

const app = express();
app.use(cors());

app.use(express.json());
app.use(routes);

app.use((error, req, res, next) => {
  console.log(error);

  const statusCode = error.statusCode || 500;
  const errorMessage =
    error.message || 'Invernal Server Error';

  res.status(statusCode).json({
    errorMessage,
    statusCode,
    errors: error.errors,
  });
});

mongoose.connect(URI).then(() => {
  app.listen(9000, () => {
    console.log('Server is running on port 9000');
  });
});
