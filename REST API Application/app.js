const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

dotenv.config();

const URI = process.env.URI;

const feedRoutes = require('./routes/feed');

const app = express();

const fileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images');
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4());
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'images/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(bodyParser.json());
app.use(
  multer({
    storage: fileStorage,
    fileFilter: fileFilter,
  }).single('image')
);
app.use(
  '/images',
  express.static(path.join(__dirname, 'images'))
);

app.use((req, res, next) => {
  res.setHeader('Access-Contorl-Allow-Origin', '*');
  res.setHeader(
    'Access-Contorl-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader(
    'Access-Contorl-Allow-Headers',
    'Content-Type, Authorization '
  );
  next();
});

app.use('/feed', feedRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const statusCode = error.statusCode || 500;
  const message = error.message;
  res.status(statusCode).json({ message });
});

mongoose
  .connect(URI)
  .then(() => {
    app.listen(8080);
  })
  .catch((err) => console.log(err));
