const cartServices = require('../services/cart/cart.services');
const _ = require('lodash');

exports.createCart =  async (req, res, next)=>{
    try{
        const userData = req.user; 
        const productId = Object.values(req.body);    
        await cartServices.createCart(userData._id, productId);
        res.redirect('/home')
    }catch(err){
       next(err) 
    } 
};

exports.insertProduct = async (req, res, next) => {
    try{
        const productId = Object.values(req.body);  
        const userData = req.user; 
        await cartServices.insertProduct(userData._id, productId);
        res.redirect('/cart')
    }catch(err){
        next(err);
    }
};

exports.deleteProduct = async (req, res, next)=>{
    try{
        const productId = Object.values(req.body);  
        const userData = req.user; 
        await cartServices.deleteProduct(userData._id, productId);
        res.redirect('/cart')  
    }catch(err){
       next(err) 
    } 
};

/* exports.deleteCart = async (req, res, next)=>{
    try{
        if(!admin){
            return res.status(400).json({ 
                error: -1, 
                message: `Route ${req.baseUrl} method ${req.method} Not authorized` 
            })
        };
        const {uuid} = req.params;
        const data = await cartServices.deleteCart(uuid);
        if(_.isNil(data)){
            return res.status(400).json({
                success: false, 
                message: 'Cart not found'
            }) 
        };
        res.status(200).json({
            success: true,
            message: `Cart uuid: ${uuid} deleted`
        }); 
    }catch(err){
       next(err) 
    } 
}; */