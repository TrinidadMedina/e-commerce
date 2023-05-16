const cartServices = require('../services/cart/cart.services');
const ordersServices = require('../services/orders/orders.services');
const _ = require('lodash');

exports.redirectLogin = async (req, res, next) => {
    try{
        if(req.isAuthenticated()){
            return res.redirect('/home')
        }
        const message = req.flash('error')[0];
        if (message) {
            throw new Error(message)
        }
        return res.redirect('/login');
    }catch(err){
        next(err);
    }
}

exports.getLogin = async (req, res, next) => {
    try{
        if(req.isAuthenticated()){
            return res.redirect('/home')
        }
        const message = req.flash('error')[0];
        if (message) {
            throw new Error(message)
        }
        return res.render('signin', { error: null });
    }catch(err){
        next(err);
    }
}

exports.getSignup = async (req, res, next) => {
    try{
        if(req.isAuthenticated()){
            return res.redirect('/home')
        }
        const message = req.flash('error')[0];
        if (message) {
            throw new Error(message)
        }
        return res.render('signup', { error: null });
    }catch(err){
        next(err);
    }
}

exports.getHome = async (req, res, next) => {
    try{
        const userData = req.user;
        if(_.isEmpty(req.query)){
            const data = await cartServices.getProducts();
            return res.render('home', {options: data, userData, error: null, query: null});
        }
        if(req.query.categoria && req.query.message){
            const data = await cartServices.getProductsCategory(req.query.categoria);
            return res.render('home', {options: data, userData, error: req.query.message, query: req.query.categoria});
        }  
        if(req.query.categoria){
            const data = await cartServices.getProductsCategory(req.query.categoria);
            return res.render('home', {options: data, userData, error: null, query: req.query.categoria});
        }
        if(req.query.message){
            const data = await cartServices.getProducts();
            return res.render('home', {options: data, userData, error: req.query.message, query: null});
        }   
    }catch(err){
        next(err);
    }
}

exports.getCart = async (req, res, next) => {
    try{
        const userData = req.user;
        const data = await cartServices.getCart(userData.email);
        return res.render('cart', {options: data, userData, error: null});
    }catch(err){
        next(err);
    }
}

exports.getUserInfo = async (req, res, next) => {
    try{
        const userData = req.user;
        return res.render('user-info', {userData, error: null});
    }catch(err){
        next(err);
    }
};

exports.getOrders = async (req, res, next) => {
    try{
        const userData = req.user;
        const data = await ordersServices.getOrders(userData.email);
        return res.render('orders', {options: data, userData, error: null});
    }catch(err){
        next(err);
    }
};

exports.getOrder = async (req, res, next) => {
    try{
        const userData = req.user;
        const {orderNumber} = req.query;
        const data = await ordersServices.getOrder(orderNumber);
        return res.render('one-order', {options: data, userData, error: null});
    }catch(err){
        next(err);
    }
};

exports.getChat = async (req, res, next) => {
    try{
        const userData = req.user;
        return res.render('chat', {userData, error: null});
    }catch(err){
        next(err);
    }
};

exports.getError = async (_req, res, next) => {
    try{
        return res.render('error', {error: 'error'});
    }catch(err){
        next(err)
    }
};