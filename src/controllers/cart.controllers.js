const cartServices = require('../services/cart/cart.services');
const ordersServices = require('../services/orders/orders.services');
const _ = require('lodash');
const {sendMail} = require('../utils/nodemailer');
const {sendMessage} = require('../utils/twilio');

exports.createCart =  async (req, res, next)=>{
    try{
        const {email} = req.user; 
        const {productUuid} = req.body; 
        const result = await cartServices.createCart(email, productUuid);
        const productsData = await cartServices.getProducts();
        return res.render('home', {options: productsData, error: result, userData : req.user })
    }catch(err){
        next(err);
    } 
};

exports.createProduct =  async (req, res, next)=>{
    try{
        const {body} = req;
        if(_.isEmpty(body)){
            return res.status(400).json({
                success: false, 
                message: 'Body data missing'
            });
        };
        if(_.every(_.values(req.body), _.isNil)){
            return res.status(400).json('Faltan parámetros')
        }
        await cartServices.createProduct(body);
        res.redirect('/home')
    }catch(err){
        next(err);
    } 
};

exports.insertProduct = async (req, res, next) => {
    try{
        const {productUuid} = req.body;  
        const {email} = req.user; 
        await cartServices.insertProduct(email, productUuid);
        const data = await cartServices.getCart(email);
        return res.render('cart', { options: data, error: null, userData: req.user});
    }catch(err){
        next(err);
    }
};

exports.deleteProduct = async (req, res, next)=>{
    try{
        const {productUuid} = req.body;  
        const {email} = req.user; 
        await cartServices.deleteProduct(email, productUuid);
        const data = await cartServices.getCart(email);
        return res.render('cart', { options: data, error: null, userData: req.user});
    }catch(err){
        next(err);
    } 
};

exports.buyCart =  async (req, res, next)=>{
    try{
        const adminNumber = '992182531';
        const userData = req.user; 
        const cart = await cartServices.getCart(userData.email);
        const listProduct = cart.products.map(prod => {
           return {name: prod.name, price: prod.price, quantity: prod.quant, total: prod.price*prod.quant}
        })
        const finalData = {name: userData.username, email: userData.email, number: userData.number, address: userData.address, products: listProduct}
        await sendMail(`nuevo pedido de ${finalData.name}, ${finalData.email}`, JSON.stringify(finalData));
        await sendMessage(`whatsapp:+56${adminNumber}`, JSON.stringify(finalData));
        await sendMessage(`+56${finalData.number}`, 'su pedido ha sido recibido y se encuentra en proceso');
        await ordersServices.createOrder(userData.email);
        await cartServices.deleteCart(userData.email);
        const productsData = await cartServices.getProducts();
        return res.render('home', {options: productsData, error: 'Tu orden fue recibida con éxito', userData })
    }catch(err){
        next(err);
    } 
};