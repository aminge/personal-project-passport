// var express = require('express');
// var router = express.Router();
// var passport = require('passport'); //uncommented this to try to get user info from server
var path = require('path');

var contact = require('./contact');

module.exports = function(app, passport) {
  app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email', 'https://www.googleapis.com/auth/calendar'] }));

  // the callback after google has authenticated the user
  app.get('/auth/google/callback',
    passport.authenticate('google', {
      successRedirect : '/home',
      failureRedirect : '/'
    })
  );

  app.get('/auth/logout', isLoggedIn, function(req, res) {
    var user = req.user;

    user.token = undefined;
    user.save(function(err) {
      // console.log(user, ' has been successfully logged out.');
      // res.redirect('/');
      req.logout();
      res.redirect('https://accounts.google.com/logout?continue=https://appengine.google.com/_ah/logout?continue=http://localhost:3000');
    });
    // req.session.destroy();

    // req.redirect('/');
  });

  // route middleware to ensure user is logged in
  function isLoggedIn(req, res, next) {
      if (req.isAuthenticated())
          return next();
      // console.log('user logged in::', req.user);
      res.redirect('/');
  }

  app.get('/home', isLoggedIn, function(req, res) {
    // console.log('user logged in :: ', req.user);
    res.sendFile(path.resolve(__dirname, '../public/views/home.html'));
  });

};
