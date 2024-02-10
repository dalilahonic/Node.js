const express = require('express');

const app = express();

app.use((req, res, next) => {
  console.log('..');
  next();
});

app.use('/users', (req, res) => {
  console.log('dummy');
  res.send('<h3> Dummy User </h3>');
});

app.use('/', (req, res) => {
  console.log('log something to the console');
  res.send('<h3> Main page </h3>');
});

app.listen(3000);
