const productServices = require('../services/product/product.services.js');
const _ = require('lodash');

//let admin = false;
let admin = true;

exports.createProduct =  async (req, res, next)=>{
    try{
        const {body} = req;
        if(!admin){
            return res.status(400).json({ 
                error: -1, 
                message: `route ${req.baseUrl} method ${req.method} Not authorized` 
            });
        };
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
        
        const data = await productServices.createProduct(body);
        res.status(200).json({
            success: true,
            data: data
        });
    }catch(err){
       next(err) 
    } 
};

exports.getProducts = async (_req, res, next)=>{
    try{
        const data = await productServices.getProducts();
         res.status(200).json({
            success: true,
            data: data
        }); 
        //res.render('index.ejs', {options: data})
    }catch(err){
        next(err); 
    }
};

exports.getProduct = async (req, res, next)=>{
    try{
        const body = req.body.product
        console.log(body)
        //const data = await productServices.getProduct(uuid);
 /*        if(_.isNil(data)){
            return res.status(400).json({
                success: false, 
                data: 'Product not found'
            });
        }
        res.status(200).json({
            success: true,
            data: data
        }); */
        res.redirect('/home')
    }catch(err){
        next(err); 
    }
};

exports.deleteProduct = async (req, res, next) => {
    try{
        if(!admin){
            return res.status(400).json({ 
                error: -1, 
                message: `route ${req.baseUrl} method ${req.method} Not authorized` 
            });
        }
        const {uuid} = req.params;
        const data = await productServices.deleteProduct(uuid);
        if(_.isNil(data)){
            return res.status(400).json({
                success: false, 
                message: 'Product not found'
            });
            
        };
        res.status(200).json({
            success: true,
            message: `Product uuid: ${uuid} deleted`
        });
    }catch(err){
        next(err);
    }
};

