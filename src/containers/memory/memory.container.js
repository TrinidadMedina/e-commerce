const _ = require('lodash');
const CartDAO = require('../../daos/cart.dao');
const CartModel = require('./models/memory.cart.model');
const ProductModel = require('./models/memory.product.model');
const ProductDTO = require('../../dtos/product.dto')

class MemoryCartDAO extends CartDAO {
  constructor() {
    super();
    this.carts = [];
    this.products = [];
  }

  async create(data) {
    try{
      let cart = null;
      const product = this.products.find(product => product.uuid == data.products);
      if(this.carts.length !== 0){
        cart = this.carts.find(cart => cart.user.toString() == data.user.toString());
      }
      if(_.isNil(cart)){
        const newCart =  new CartModel(data);
        newCart.products.push({product, quant:1});
        this.carts.push(newCart);
        return
      }

      for(let i = 0; i < cart.products.length; i++){
        if(cart.products[i].product.uuid == data.products){
          return 'Producto ya existe en tu carro'
        }
      }
      const index = this.carts.findIndex(cart => cart.user.toString() == data.user.toString());
      cart.products.push({product, quant: 1})
      this.carts.splice(index, 1, cart);
      return;
    }catch(err){
      throw new Error(err);
    }
  }

  async getCart(userEmail) {
    try{
      const cart = this.carts.find((cart) => cart.user.toString() === userEmail.toString());
      if(_.isNil(cart)){
        return cart
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
      return cartDTO
    }catch(err){
      throw new Error(err)
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
      throw new Error(err)
    }
  }

  async insertProduct(userEmail, productUuid) {
    try{
      this.carts = this.carts.map(cart => {
        if(cart.user.toString() == userEmail.toString()){
          cart.products.map(product => {
            if(product.product.uuid.toString() == productUuid.toString()){
              product.quant++;
            }
            return product;
          })
        }
        return cart;
      });
    }catch(err){
      throw new Error(err)
    }
  }
  async deleteProduct(userEmail, productUuid) {
    try{
      this.carts = this.carts.map(cart => {
        if(cart.user.toString() == userEmail.toString()){
          cart.products.map((product, index) => {
            if(product.product.uuid.toString() == productUuid.toString()){
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
      throw new Error(err)
    }
  }
  async delete(userEmail) {
    try{
      const index = this.carts.findIndex(cart => cart.user.toString() == userEmail.toString());
      this.carts.splice(index, 1);
      return
    }catch(err){
      throw new Error(err)
    }
  }

}

module.exports = MemoryCartDAO;

