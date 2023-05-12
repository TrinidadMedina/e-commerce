const cartServices = require('../services/cart/cart.services');
const ordersServices = require('../services/orders/orders.services');
const _ = require('lodash');

exports.getLogin = async (req, res, next) => {
    try{
        if(req.isAuthenticated()){
            return res.redirect('/home')
        }
        const message = req.flash('error')[0];
        if (message) {
            throw new Error(message)
        }
        res.render('signin', { error: null });
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
        res.render('signup', { error: null });
    }catch(err){
        next(err);
    }
}

exports.getHome = async (req, res, next) => {
    try{
        const userData = req.user;
        if(_.isEmpty(req.query)){
            const data = await cartServices.getProducts();
            return res.render('home', {options: data, userData, error: null});
        }
        if(req.query.categoria){
            const data = await cartServices.getProductsCategory(req.query.categoria);
            return res.render('home', {options: data, userData, error: null});
        }
        if(req.query.message){
            const data = await cartServices.getProducts();
            return res.render('home', {options: data, userData, error: req.query.message});
        }   
    }catch(err){
        next(err);
    }
}

exports.getCart = async (req, res, next) => {
    try{
        const userData = req.user;
        const data = await cartServices.getCart(userData.email);
        res.render('cart', {options: data, userData, error: null});
    }catch(err){
        next(err);
    }
}

exports.getUserInfo = async (req, res, next) => {
    try{
        const userData = req.user;
        res.render('user-info', {userData, error: null});
    }catch(err){
        next(err);
    }
};

exports.getError = async (_req, res, next) => {
    try{
        res.render('error', {error: 'error'});
    }catch(err){
        next(err)
    }
};

exports.getOrders = async (req, res, next) => {
    try{
        const userData = req.user;
        const data = await ordersServices.getOrders(userData.email);
        res.render('orders', {options: data, userData, error: null});
    }catch(err){
        next(err);
    }
};

exports.getChat = async (req, res, next) => {
    try{
        const userData = req.user;
        res.render('chat', {userData, error: null});
    }catch(err){
        next(err);
    }
};