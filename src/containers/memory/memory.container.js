const _ = require('lodash');
const CartDAO = require('../../daos/cart.dao');
const CartModel = require('./models/memory.cart.model');
const ProductModel = require('./models/memory.product.model');

class MemoryCartDAO extends CartDAO {
  constructor() {
    super();
    this.carts = [];
    this.products = [];
  }

  async create(data) {
    try{
      let cart = null;
      const product = this.products.find(product => product._id == data.products.product);
      if(this.carts.length !== 0){
        cart = this.carts.find(cart => cart.user.toString() == data.user.toString());
      }
      if(_.isNil(cart)){
        const newCart =  new CartModel(data);
        newCart.products.push({product, quant:1});
        this.carts.push(newCart);
        return
      }
      if(cart.products.includes(product)){
        console.log('producto ya existe en el carro');
        return
      }
      const index = this.carts.findIndex(cart => cart.user.toString() == data.user.toString());
      cart.products.push({product, quant: 1})
      this.carts.splice(index, 1, cart);
      return;
    }catch(err){
      throw new Error(err.message);
    }
  }

  async getCart(userId) {
    try{
      const cart = this.carts.find((cart) => cart.user.toString() === userId.toString());
      return cart;
    }catch(err){
      throw new Error(err.message)
    }
  }

  async createProduct(productData) {
    this.products.push(new ProductModel(productData));
    return this.products
  }
  
  async getProducts() {
    try{
      return this.products;
    }catch(err){
      throw new Error(err.message)
    }
  }

  async insertProduct(userId, productId) {
    try{
      this.carts = this.carts.map(cart => {
        if(cart.user.toString() == userId.toString()){
          cart.products.map(product => {
            if(product.product._id.toString() == productId.toString()){
              product.quant++;
            }
            return product;
          })
        }
        return cart;
      });
    }catch(err){
      throw new Error(err.message)
    }
  }
  async deleteProduct(userId, productId) {
    try{
      this.carts = this.carts.map(cart => {
        if(cart.user.toString() == userId.toString()){
          cart.products.map((product, index) => {
            if(product.product._id.toString() == productId.toString()){
              if(product.quant == 1){
                cart.products.splice(index, 1);
              }else{
                product.quant--;
              }
            }
            return product;
          })
        }
        return cart;
      });

    }catch(err){
      throw new Error(err.message)
    }
  }
  async delete(userId) {
    try{
      const index = this.carts.findIndex(cart => cart.user.toString() == userId.toString());
      this.carts.splice(index, 1);
      return
    }catch(err){
      throw new Error(err.message)
    }
  }

}

module.exports = MemoryCartDAO;

