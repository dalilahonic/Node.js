const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

router.get('/form', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'form.html'));
});

router.post('/profile', (req, res, next) => {
  const username = req.body.username;

  res.send(`<h1> ${username} </h1>`);
});

router.get('/profile', (req, res) => {
  res.send('<h1>You are not logged in </h1>');
});

module.exports = router;
