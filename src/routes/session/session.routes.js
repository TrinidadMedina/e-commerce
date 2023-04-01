const router = require('express').Router();
const passport = require('passport');
const {getSignout} = require ('../../controllers/session.controllers');

router
.post('/signup', passport.authenticate('signup', {
  successRedirect: '/home',
  failureRedirect: '/error',
  failureFlash: true // habilitar el uso de req.flash
}))
.post('/', passport.authenticate('login', {
  successRedirect: '/home',
  failureRedirect: '/error',
  failureFlash: true // habilitar el uso de req.flash
}))
.get('/signout', getSignout);

module.exports = router;
