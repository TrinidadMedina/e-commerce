const productServices = require('../services/product/product.services');
const cartServices = require('../services/cart/cart.services');

exports.getLogin = async (req, res) => {
    try{
        if(req.isAuthenticated()){
            return res.redirect('/home')
        }
        res.render('signin');
    }catch(err){
        console.error(err.message);
        res.render('error');
    }
}

exports.getSignup = async (req, res) => {
    try{
        if(req.isAuthenticated()){
            return res.redirect('/home')
        }
        res.render('signup');
    }catch(err){
        console.error(err.message);
        res.render('error');
    }
}

exports.getHome = async (req, res) => {
    try{
        const userData = req.user;
        const data = await productServices.getProducts();
        res.render('home', {options: data, fullname: userData.username});
    }catch(err){
        console.error(err);
        res.redirect('/');
    }
}

exports.getCart = async (req, res) => {
    try{
        const userData = req.user;
        const data = await cartServices.getCarts(userData._id);
        res.render('cart', {options: data, fullname: userData.username});
    }catch(err){
        console.error(err);
        res.redirect('/');
    }
}

exports.getError = async (_req, res) => {
    try{
        res.render('error');
    }catch(err){
        console.error(err.message);
        res.render('error');
    }
}