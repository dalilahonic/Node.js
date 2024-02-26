const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(
  session
);
const errorController = require('./controllers/error');
const User = require('./models/user');

require('dotenv').config();
const mongodbUrl = process.env.URL;

const app = express();
const store = new MongoDBStore({
  uri: mongodbUrl,
  collection: 'sessions',
});
app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use((req, res, next) => {
  User.findById('5bab316ce0a7c75f783cb8a8')
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

mongoose
  .connect(mongodbUrl)
  .then((result) => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: 'Max',
          email: 'max@test.com',
          cart: {
            items: [],
          },
        });
        user.save();
      }
    });
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });

// "body-parser": "^1.18.3",
// "connect-mongodb-session": "^5.0.0",
// "dotenv": "^16.4.5",
// "ejs": "^2.6.1",s
// "express": "^4.16.3",
// "express-session": "^1.18.0",
// "mongodb": "^3.1.6",
// "mongoose": "^5.2.17",
// "mysql2": "^1.6.1",
// "sequelize": "^5.0.0-beta.11"
// "nodemon": "^1.18.3"
