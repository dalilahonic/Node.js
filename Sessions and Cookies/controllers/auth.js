const User = require('../models/user');

exports.getLogin = (req, res, next) => {
  console.log(req.session);
  // Session {
  //   cookie: { path: '/', _expires: null, originalMaxAge: null, httpOnly: true }
  // }

  // console.log(req.session.isLoggedIn);

  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: false,
  });
};

module.exports.postLogin = (req, res, next) => {
  User.findById('65db4cfbd60c28519849880d')
    .then((user) => {
      req.session.user = user;
      req.session.isLoggedIn = true;
      req.session.save((err) => {
        if (err) console.log(err);
        res.redirect('/');
      });
    })
    .catch((err) => console.log(err));
};

exports.postLogout = (req, res) => {
  req.session.destroy((err) => {
    if (err) console.log(err);
    else console.log('Session destroyed');
    res.redirect('/');
  });
};
