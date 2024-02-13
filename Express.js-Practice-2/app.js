const express = require('express');
const routes = require('./routes');
const bodyParser = require('body-parser');

// console.log(__dirname); // C:\Users\Dalila\Desktop\NodeJS\Express.js-Practice-2
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', routes);
// When you use app.use('/', router), it means that you're telling Express to use the router middleware for any route that starts with /.
app.listen(3000);
