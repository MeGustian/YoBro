var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', function(req, res) {

  // render the page and pass in any flash data if it exists
  //res.render('login', { message: req.flash('loginMessage') });
  res.render('login');
});

router.get('/home', function(req, res) {

    // render the page and pass in any flash data if it exists
    //res.render('login', { message: req.flash('loginMessage') });
    res.render('home');
});

router.post('/login', passport.authenticate('local-login', {
  successRedirect : '/home', // redirect to the secure profile section
  failureRedirect : '/users/login', // redirect back to the signup page if there is an error
  failureFlash : true // allow flash messages
}));

/* GET Signup page */
router.get('/signup', function(req, res) {

  // render the page and pass in any flash data if it exists
  res.render('signup', { message: req.flash('loginMessage') });
  //res.render('signup');
});

/* POST Signup credentials */
router.post('/signup', passport.authenticate('local-signup', {
  successRedirect : '/', // redirect to the secure profile section
  failureRedirect : '/users/signup', // redirect back to the signup page if there is an error
  failureFlash : true // allow flash messages
}));

module.exports = router;


// ================================= TWITTER LOGIN ==================================================
router.get('/auth/twitter',
    passport.authenticate('twitter'));

router.get('/auth/twitter/callback',
    passport.authenticate('twitter', {
      successRedirect : '/',
      failureRedirect: '/users/login' }),
    function(req, res) {
      // Successful authentication, redirect home.
      res.redirect('/');
    });