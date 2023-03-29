const router = require('express').Router();
const productServices = require('../services/product/product.services');
const cartServices = require('../services/cart/cart.services')

exports.getLogin = async (req, res) => {
    try{
        if(req.isAuthenticated()){
            return res.redirect('/home')
        }
        res.render('login');
    }catch(err){
        console.error(err);
        res.render('/');
    }
};

exports.getSignup = async (req, res) => {
    try{
        if(req.isAuthenticated()){
            return res.redirect('/home')
        }
        res.render('signup');
    }catch(err){
        console.error(err);
        res.render('/');
    }
};

exports.getHome = async (req, res) => {
    try{
        const userData = req.user;
        const data = await productServices.getProducts();
        res.render('home', {options: data, fullname: userData.username});
    }catch(err){
        console.error(err);
        res.render('/');
    }
};

router.getCart = async (req, res) => {
    try{
        const userData = req.user;
        const data = await cartServices.getCarts(userData._id);
        res.render('cart', {options: data, fullname: userData.username});
    }catch(err){
        console.error(err);
        res.render('/');
    }
};

module.exports = router;