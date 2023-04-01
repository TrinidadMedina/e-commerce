const router = require('express').Router();
const authMiddleware = require('../../middlewares/auth.middleware');

const {
    getLogin,
    getSignup,
    getHome,
    getCart,
    getUserInfo,
    getError
} = require ('../../controllers/pages.controllers');

router
.get('/', getLogin)
.get('/signup', getSignup)
.get('/home', authMiddleware, getHome)
.get('/cart', authMiddleware, getCart)
.get('/user-info', authMiddleware, getUserInfo)
.get('/error', getError);

module.exports = router;