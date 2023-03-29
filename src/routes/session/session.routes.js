const router = require('express').Router();
const passport = require('passport');

router.post('/signup', passport.authenticate('signup', {failureRedirect: '/'}), async (_req, res) => {
    res.redirect('/home');
});

router.post('/', passport.authenticate('login', {failureRedirect: '/'}), async (_req, res) => {
    res.redirect('/home');
});

router.get('/signout', (req, res) => {
    req.logout(() => {
        res.redirect('/');
    })
})

module.exports = router;