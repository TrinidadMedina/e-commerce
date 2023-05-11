const cartServices = require('../services/cart/cart.services');

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
        const data = await cartServices.getProducts();
        res.render('home', {options: data, userData, error: null});

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
        res.render('orders', {userData, error: null});
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