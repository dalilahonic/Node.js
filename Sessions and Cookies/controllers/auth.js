exports.getLogin = (req, res, next) => {
  console.log(req.get('Cookie')); // loggedIn=true
  const isLoggedIn =
    req.get('Cookie').split('=')[1] === 'true';
  console.log(isLoggedIn);

  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: isLoggedIn,
  });
};

exports.postLogin = (req, res) => {
  // req.isLoggedIn = true;
  res.setHeader('Set-Cookie', 'loggedIn=true');
  res.redirect('/');
};
