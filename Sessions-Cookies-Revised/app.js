import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import connectMongoDBSession from 'connect-mongodb-session';
import routes from './routes.js';

dotenv.config();
const URI = process.env.MONGODB_URI;

const connectMongoDB = connectMongoDBSession(session);

const store = new connectMongoDB({
  uri: URI,
  collection: 'sessions',
});

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(
  session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store,
  })
);

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

app.use(routes);

mongoose
  .connect(URI)
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => console.log(err));
