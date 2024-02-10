const http = require('http');
const bodyParser = require('body-parser');
const express = require('express');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

// app.use((req, res, next) => {
//   console.log('In the middleware!');
//   next();
// });

// app.use('/', (req, res, next) => {
//   console.log('This always runs!');
//   next();
// });

app.use('/add-product', (req, res, next) => {
  console.log('In the another middleware!');
  // res.send('<h1> Add product page </h1>');
  res.send(
    '<form action="/product" method="POST"> <input type="text" name="title"> <button type="submit"> Add product </button></form>'
  );
});

// app.use('/product', (req, res, next) => {
//   console.log(req.body);
//   res.redirect('/');
// });

app.post('/product', (req, res, next) => {
  console.log(req.body);
  res.redirect('/');
});
// for post requests

app.use('/', (req, res, next) => {
  console.log('In the another middleware!');
  res.send('<h1> Hello from Express </h1>');
});

const server = http.createServer(app);

server.listen(3000);
