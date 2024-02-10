const bodyParser = require('body-parser');
const express = require('express');

const admirRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(admirRoutes);
app.use(shopRoutes);

app.listen(3000);
