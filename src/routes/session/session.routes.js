const router = require('express').Router();
const passport = require('passport');
const {getSignout} = require ('../../controllers/session.controllers');
//const multer = require("multer");

/* const storage = multer.diskStorage({
  destination: "public/images/",
  filename: function (req, file, cb) {
    cb(null, `${req.body.email}.png`) 
  }
}) */

//const upload = multer({ storage: storage });
router
.post('/signup',/*  upload.single("image"), */ (req, res) =>{
  console.log(req.body)
  passport.authenticate('signup', {
    successRedirect: '/home',
    failureRedirect: '/signup',
    failureFlash: true
  })(req, res);
})
.post('/login', passport.authenticate('login', {
  successRedirect: '/home',
  failureRedirect: '/login',
  failureFlash: true
}))
.get('/signout', getSignout);

module.exports = router;
