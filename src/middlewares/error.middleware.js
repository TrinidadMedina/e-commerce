//const loggerConsole = require('../utils/log4js').loggerConsole;
const cartServices = require('../services/cart/cart.services');
const ordersServices = require('../services/orders/orders.services')

const errorMiddleware = async (err, req, res, _next) => {
    const userData = req.user; 
    //loggerConsole.error(err);
    console.error(err)
    switch (req.path) {
        case '/':
            return res.render('signin', { error: err.message })
        case '/signup':
            return res.render('signup', { error: err.message })
        case '/home':
            const productsData = await cartServices.getProducts();
            return res.render('home', {options: productsData, error: err.message, userData, query: null })
        case '/cart':
            const cartData = await cartServices.getCart(userData.email);
            return res.render('cart', { options: cartData, error: err.message, userData })
        case '/user-info':
            return res.render('user-info', { error: err.message, userData })
        case '/orders':
            const ordersData = await ordersServices.getOrders(userData.email);
            return res.render('orders', { options: ordersData, error: err.message, userData })
        case '/one-order':
            const data = await ordersServices.getOrder(userData.email);
            return res.render('orders', { options: data, error: err.message, userData })
        case '/chat':
            return res.render('chat', { error: err.message, userData })
        default:
            return res.render('error', { error: err.message, userData })
    }
};

module.exports = errorMiddleware;