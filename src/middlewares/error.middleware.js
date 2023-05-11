const loggerConsole = require('../utils/log4js').loggerConsole;
const loggerFile = require('../utils/log4js').loggerFile;
const cartServices = require('../services/cart/cart.services');

const errorMiddleware = async (err, req, res, _next) => {
    const userData = req.user; 
    loggerConsole.error(err)
    loggerFile.error(err);
    switch (req.path) {
        case '/':
            return res.render('signin', { error: err.message })
        case '/signup':
            return res.render('signup', { error: err.message })
        case '/home':
            const productsData = await cartServices.getProducts();
            return res.render('home', {options: productsData, error: err.message, userData })
        case '/cart':
            const data = await cartServices.getCart(userData.email);
            return res.render('cart', { options: data, error: err.message, userData })
        case '/user-info':
            return res.render('user-info', { error: err.message, userData })
        case '/orders':
            return res.render('orders', { error: err.message, userData })
        case '/chat':
            return res.render('chat', { error: err.message, userData })
        default:
            return res.render('error', { error: err.message, userData })
    }
};

module.exports = errorMiddleware;