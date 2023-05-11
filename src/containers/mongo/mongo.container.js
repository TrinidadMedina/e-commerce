const _ = require('lodash');
const CartDAO = require('../../daos/cart.dao');
const cartModel = require('./models/mongo.cart.model');
const productModel = require('./models/mongo.product.model');
const userModel = require('./models/mongo.user.model');
const ProductDTO = require('../../dtos/product.dto')

class MongoCartDAO extends CartDAO {
    constructor() {
      super();
    }
  
    async create(data) {
        try{
            const user = await userModel.findOne({email: data.user});
            const cart = await cartModel.findOne({user: user._id}).populate('products.product');
            const product = await productModel.findOne({uuid: data.products});
            if(!cart){
                data.user = user._id;
                data.products = {product: product._id};
                await cartModel.create(data);
                return 'Producto agregado'
            }
            const prod = cart.products.filter(prod => prod.product.uuid == data.products);
            if(!_.isEmpty(prod)){
                  return 'Producto ya existe en tu carro'
            }else{
                await cartModel.updateOne({_id: cart._id}, { $push: {products: { product: product._id }} });
                return 'Producto agregado'
            }
        }catch(err){
            throw new Error(err);
        }
    };
  
/*     async createProduct(data) {
        try{
            const product = await productModel.findOne({name: data.name});
            if(product){
                return 'Producto ya existe en el catálogo'
            }
            return await productModel.create(data);
        }catch(err){
            throw new Error(err)
        }
    } */

    async getCart(userEmail) {
        try{
            const user = await userModel.findOne({email: userEmail});
            const cart = await cartModel.findOne({user: user._id}).populate('products.product');
            if (!cart){
                return cart;
            }
            let suma = 0;
            const products = cart.products.map(product => {
                const productData = product.product;
                const total = productData.price * product.quant;
                suma += total;
                const productDTO = new ProductDTO(
                    productData.uuid,
                    productData.name,
                    productData.description,
                    productData.image,
                    productData.price,
                    product.quant,
                    total 
                );
                return productDTO;
            });
            const cartDTO = {products, suma};
            return cartDTO;
        }catch(err){
            throw new Error(err);
        }   
    };

    async getProducts() {
        try{
            const products = await productModel.find();
            const productsDTO = products.map(product => {
                const productDTO = new ProductDTO(
                    product.uuid,
                    product.name,
                    product.description,
                    product.image,
                    product.price
                );
                return productDTO;
            });
            return productsDTO
        }catch(err){
            throw new Error(err);
        }   
    };

    async delete(userEmail) {
        try{
            const user = await userModel.findOne({email: userEmail});
            await cartModel.deleteOne({user: user._id});
            return 
        }catch(err){
            throw new Error(err);
        }
    };

    async insertProduct(userEmail, productUuid) {
        try{ 
            const user = await userModel.findOne({email: userEmail});
            const cart = await cartModel.findOne({user: user._id}).populate('products.product');
            const prod = cart.products.filter(prod => prod.product.uuid == productUuid);
            await cartModel.findOneAndUpdate(
                { _id: cart._id, "products._id": prod[0]._id }, 
                { $set: { "products.$.quant": prod[0].quant+1 } }
            );
            return
        }catch(err){
            throw new Error(err)
        }
    };

    async deleteProduct(userEmail, productUuid) {
        try{
            const user = await userModel.findOne({email: userEmail});
            const cart = await cartModel.findOne({user: user._id}).populate('products.product');
            const prod = cart.products.filter(prod => prod.product.uuid == productUuid);
            if(prod[0].quant == 1){
                await cartModel.updateOne({_id: cart._id}, { $pull: {products: { product: prod[0].product}} });
                return
            }
            await cartModel.findOneAndUpdate(
                { _id: cart._id, "products._id": prod[0]._id }, 
                { $set: { "products.$.quant": prod[0].quant-1 } }
            );
            return 
        }catch(err){
            throw new Error(err);
        }
    };
}

module.exports = MongoCartDAO;