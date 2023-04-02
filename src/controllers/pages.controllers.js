const fs = require('fs');
const path = require('path');
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
        res.render('error', {error: err.message});
    }
}

exports.getHome = async (req, res) => {
    try{
        const userData = req.user;
        const data = await productServices.getProducts();
        res.render('home', {options: data, userData});

    }catch(err){
        console.error(err);
        res.render('error', {message: err.message});
    }
}

exports.getCart = async (req, res) => {
    try{
        const userData = req.user;
        const data = await cartServices.getCarts(userData._id);
        res.render('cart', {options: data, userData});
    }catch(err){
        console.error(err);
        res.render('error', {error: err.message});
    }
}

exports.getUserInfo = async (req, res) => {
    try{
        const userData = req.user;
        res.render('user-info', {userData});
    }catch(err){
        console.error(err.message);
        res.render('error');
    }
}

exports.getError = async (req, res) => {
    try{
        const message = req.flash('error')[0];
        res.render('error', {message});
    }catch(err){
        console.error(err.message);
        res.render('error', {message: err.message});
    }
}