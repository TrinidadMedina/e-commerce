const router = require('express').Router();
const authMiddleware = require('../../middlewares/auth.middleware');

const {
    redirectLogin,
    getLogin,
    getSignup,
    getHome,
    getCart,
    getUserInfo,
    getOrders,
    getOrder,
    getChat,
    getError
} = require ('../../controllers/pages.controllers');

router
.get('/', redirectLogin)
.get('/login', getLogin)
.get('/signup', getSignup)
.get('/home', authMiddleware, getHome)
.get('/cart', authMiddleware, getCart)
.get('/user-info', authMiddleware, getUserInfo)
.get('/orders', authMiddleware, getOrders)
.get('/one-order', authMiddleware, getOrder)
.get('/chat', authMiddleware, getChat)
.get('/error', authMiddleware, getError)

module.exports = router;