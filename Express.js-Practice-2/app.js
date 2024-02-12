const express = require('express');
const path = require('path');
const router = express.Router();

// console.log(__dirname); // C:\Users\Dalila\Desktop\NodeJS\Express.js-Practice-2
const app = express();

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

router.get('/form', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'form.html'));
});

router.post('/profile', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'profile.html'));
});

router.get('/profile', (req, res) => {
  res.send('<h1>You are not logged in </h1>');
});

app.use('/', router);
// When you use app.use('/', router), it means that you're telling Express to use the router middleware for any route that starts with /.

// app.use('/', (req, res, next) => {
//   //   res.send('<h1> ovo je stranica </h1>');
//   res.sendFile(path.join(__dirname, 'index.html'));
// });

app.listen(3000);
