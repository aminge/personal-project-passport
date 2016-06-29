function isLoggedIn(req, res, next) {
  console.log('auth.js: ', req.isAuthenticated());
    if (req.isAuthenticated())
        return next();
    // console.log('user logged in::', req.user);
    res.redirect('/');
}

module.exports = isLoggedIn;
