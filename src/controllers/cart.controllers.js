const cartServices = require('../services/cart/cart.services');
const productServices = require('../services/product/product.services')
const _ = require('lodash');

exports.createCart =  async (req, res)=>{
    try{
        const userData = req.user; 
        const productId = Object.values(req.body);    
        await cartServices.createCart(userData._id, productId);
        res.redirect('/home')
    }catch(err){
       console.error(err)
    } 
};

exports.createProduct =  async (req, res)=>{
    try{
        const {body} = req;
        if(_.isEmpty(body)){
            return res.status(400).json({
                success: false, 
                message: 'Body data missing'
            });
        };
        if (_.isNil(body.name) || _.isNil(body.description) || _.isNil(body.image) || _.isNil(body.price) || _.isNil(body.stock)){
            return res.status(400).json({
                success: false, 
                message: 'Product atributte missing'
            });
        };
        await productServices.createProduct(body);
        res.redirect('/home')
    }catch(err){
       console.error(err.message)
    } 
};

exports.insertProduct = async (req, res) => {
    try{
        const productId = Object.values(req.body);  
        const userData = req.user; 
        await cartServices.insertProduct(userData._id, productId);
        res.redirect('/cart')
    }catch(err){
        console.error(err)
    }
};

exports.deleteProduct = async (req, res)=>{
    try{
        const productId = Object.values(req.body);  
        const userData = req.user; 
        await cartServices.deleteProduct(userData._id, productId);
        res.redirect('/cart')  
    }catch(err){
        console.error(err)
    } 
};