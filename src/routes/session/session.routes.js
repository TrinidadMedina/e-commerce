const router = require('express').Router();
const passport = require('passport');
const {getSignout} = require ('../../controllers/session.controllers');
const multer = require("multer");

const storage = multer.diskStorage({
  destination: "public/images/",
  filename: function (req, file, cb) {
    cb(null, `${req.body.email}.png`) // Aquí puedes poner el nombre que desees para la foto
  }
})

const upload = multer({ storage: storage });
router
.post('/signup', upload.single("image"), (req, res) =>{
  passport.authenticate('signup', {
    successRedirect: '/home',
    failureRedirect: '/signup',
    failureFlash: true
  })(req, res);
})
.post('/', passport.authenticate('login', {
  successRedirect: '/home',
  failureRedirect: '/',
  failureFlash: true
}))
.get('/signout', getSignout);

module.exports = router;
