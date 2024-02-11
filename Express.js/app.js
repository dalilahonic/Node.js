const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');

const admirRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/admin', admirRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res
    .status(404)
    .sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(3000);
