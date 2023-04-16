const _ = require('lodash');
const CartDAO = require('../../daos/cart.dao');
const cartModel = require('./models/mongo.cart.model');
const productModel = require('./models/mongo.product.model')

class MongoCartDAO extends CartDAO {
    constructor() {
      super();
    }
  
    async create(data) {
        try{
            const cart = await cartModel.findOne({user: data.user});
            if(!cart){
                return await cartModel.create(data);
            }
            const prod = cart.products.filter(prod => prod.product == data.products.product);

            if(!_.isEmpty(prod)){
                  return 'Producto ya existe en tu carro'
            }else{
                await cartModel.updateOne({_id: cart._id}, { $push: {products: { product: data.products.product }} });
                return
            }
        }catch(err){
            throw new Error(err.message);
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
            throw new Error(err.message)
        }
    } */

    async getCart(userId) {
        try{
            const cart = await cartModel.findOne({user: userId}).populate('products.product');
            if (!cart){
                throw new Error(cart);
            }
            return cart
        }catch(err){
            throw new Error(err.message);
        }   
    };

    async getProducts() {
        try{
            const products = await productModel.find();
            return products
        }catch(err){
            throw new Error(err.message);
        }   
    };

    async delete(userId) {
        try{
            let data = await cartModel.deleteOne({user: userId});
            return
        }catch(err){
            throw new Error(err.message);
        }
    };

    async insertProduct(userId, productId) {
        try{ 
            const cart = await cartModel.findOne({user: userId});
            console.log(productId)
            const prod = cart.products.filter(prod => prod.product == productId);
            console.log(prod)
            const updated = await cartModel.findOneAndUpdate(
                { _id: cart._id, "products._id": prod[0]._id }, // criterio de búsqueda
                { $set: { "products.$.quant": prod[0].quant+1 } }, // actualización
            );
            return 'Producto agregado'
        }catch(err){
            throw new Error(err.message)
        }
    };

    async deleteProduct(userId, productId) {
        try{
            const cart = await cartModel.findOne({user: userId});
            const prod = cart.products.filter(prod => prod.product == productId);
            if(prod[0].quant == 1){
                const updated = await cartModel.updateOne({_id: cart._id}, { $pull: {products: { product: productId }} });
                return
            }
            const updated = await cartModel.findOneAndUpdate(
                { _id: cart._id, "products._id": prod[0]._id }, // criterio de búsqueda
                { $set: { "products.$.quant": prod[0].quant-1 } }, // actualización
                { new: true } // opción para devolver el documento actualizado
            );
            
            return 'Producto eliminado'
        }catch(err){
            throw new Error(err.message);
        }
    };
}

module.exports = MongoCartDAO;