const productServices = require('../services/product/product.services');
const cartServices = require('../services/cart/cart.services');

exports.getLogin = async (req, res, next) => {
    try{
        if(req.isAuthenticated()){
            return res.redirect('/home')
        }
        res.render('signin');
    }catch(err){
        next(err);
    }
}

exports.getSignup = async (req, res, next) => {
    try{
        if(req.isAuthenticated()){
            return res.redirect('/home')
        }
        res.render('signup');
    }catch(err){
        next(err);
    }
}

exports.getHome = async (req, res, next) => {
    try{
        const userData = req.user;
        const data = await productServices.getProducts();
        res.render('home', {options: data, userData});

    }catch(err){
        next(err);
    }
}

exports.getCart = async (req, res, next) => {
    try{
        const userData = req.user;
        const data = await cartServices.getCarts(userData._id);
        res.render('cart', {options: data, userData});
    }catch(err){
        next(err);
    }
}

exports.getUserInfo = async (req, res, next) => {
    try{
        const userData = req.user;
        res.render('user-info', {userData});
    }catch(err){
        next(err);
    }
}

exports.getSuccess = async (req, res, next) => {
    try{
        const userData = req.user;
        res.render('success',  {userData});
    }catch(err){
        next(err);
    }
}

exports.getAuthError = async (req, res, next) => {
    try{
        const message = req.flash('error')[0];
        res.render('auth-error', {message});
    }catch(err){
        next(err);
    }
}

exports.getError = async (req, res, next) => {
    try{
        res.render('error', {message: 'error'});
    }catch(err){
        next(err.message)
    }
}