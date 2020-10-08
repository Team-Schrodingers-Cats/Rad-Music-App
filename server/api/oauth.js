const headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With, x-parse-application-id, x-parse-rest-api-key',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/plain'
};
const { Router } = require('express');
const passport = require('passport');
const cookieSession = require('cookie-session');
require('../passport-setup');

const Oauth = Router();

// will eventually live in its own file
const isLoggedIn = (req, res, next) => {
  console.log(req._passport, 'req._passport');
  if (req._passport.session) {
    next();
  } else {
    res.status(401).send('you suck');
  }
};

Oauth.get('/', (req, res) => {
  console.log(req.headers, 'here');
  // res.send("you aren't logged in");
  // res.writeHead(200, headers);
  res.redirect('https://www.petsmart.com');
});

Oauth.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

Oauth.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/failed' }),
  (req, res) => {
    // Successful authentication, redirect home.
    console.log('never get here');
    res.redirect('/api/oauth/good');
  });

Oauth.get('/failed', (req, res) => res.send('login failure'));
Oauth.get('/good', isLoggedIn, (req, res) => res.send('welcome'));

Oauth.get('/logout', (req, res) => {
  req.session = null;
  req.logout();
  res.redirect('/');
});

module.exports = {
  Oauth,
};
