const router = require('express').Router();
const passport = require('passport');
const {
  postSignup,
  postLogin,
  getSignout,
} = require ('../../controllers/session.controllers');

router
.post('/signup', passport.authenticate('signup', {failureRedirect: '/error'}), postSignup)
.post('/', passport.authenticate('login', {failureRedirect: '/error'}), postLogin)
.get('/signout', getSignout);

module.exports = router;
