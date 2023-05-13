const cartServices = require('../services/cart/cart.services');
const ordersServices = require('../services/orders/orders.services');
const _ = require('lodash');
const {sendMail} = require('../utils/nodemailer');
const {sendMessage} = require('../utils/twilio');

exports.createCart =  async (req, res, next)=>{
    try{
        const {email} = req.user; 
        const {productUuid, category} = req.body; 
        const result = await cartServices.createCart(email, productUuid);
        if(category){
            return res.redirect(`/home?categoria=${category}&message=${result}`);
        }
        return res.redirect(`/home?message=${result}`);
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
        if (_.isNil(body.name) || _.isNil(body.description) || _.isNil(body.category) || _.isNil(body.image) || _.isNil(body.price) || _.isNil(body.stock)){
            return res.status(400).json({
                success: false, 
                message: 'Product atributte missing'
            });
        };
        const result = await cartServices.createProduct(body);
        res.status(200).json(result);
    }catch(err){
        next(err);
    } 
};

exports.insertProduct = async (req, res, next) => {
    try{
        const {productUuid} = req.body;  
        const {email} = req.user; 
        await cartServices.insertProduct(email, productUuid);
        return res.redirect(`/cart`);
    }catch(err){
        next(err);
    }
};

exports.deleteProduct = async (req, res, next)=>{
    try{
        const {productUuid} = req.body;  
        const {email} = req.user; 
        await cartServices.deleteProduct(email, productUuid);
        return res.redirect(`/cart`);
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
        await sendMessage(`+56${adminNumber}`, 'su pedido ha sido recibido y se encuentra en proceso');
        await ordersServices.createOrder(userData.email);
        await cartServices.deleteCart(userData.email);
        return res.redirect(`/home?message=Tu orden fue recibida con éxito`);
    }catch(err){
        next(err);
    } 
};