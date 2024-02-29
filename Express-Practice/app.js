const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(routes);

app.listen(9000, () => {
  console.log('Listening on port 9000');
});
