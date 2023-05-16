const _ = require('lodash');
const CartDAO = require('../../daos/cart/cart.dao');
const CartModel = require('./models/memory.cart.model');
const ProductModel = require('./models/memory.product.model');
const ProductDTO = require('../../dtos/product.dto');

let carts = [];
let products = [];

class MemoryCartDAO extends CartDAO {
  constructor() {
    super();
  };

  async create(data) {
    try{
      let cart = null;
      const product = products.find(product => product.uuid == data.products);
      if(carts.length !== 0){
        cart = carts.find(cart => cart.user.toString() == data.user.toString());
      }
      if(_.isNil(cart)){
        const newCart =  new CartModel(data);
        newCart.products.push({product, quant:1});
        carts.push(newCart);
        return 'Producto agregado';
      }

      for(let i = 0; i < cart.products.length; i++){
        if(cart.products[i].product.uuid == data.products){
          return 'Producto ya existe en tu carro';
        }
      }
      const index = carts.findIndex(cart => cart.user.toString() == data.user.toString());
      cart.products.push({product, quant: 1});
      carts.splice(index, 1, cart);
      return 'Producto agregado';
    }catch(err){
      throw new Error(err);
    }
  };

  async getCart(userEmail) {
    try{
      const cart = carts.find((cart) => cart.user.toString() === userEmail.toString());
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
            productData.category,
            productData.image,
            productData.price,
            product.quant,
            total
        );
        return productDTO;
      });
      suma = suma.toLocaleString("es-CL", { style: "currency", currency: "CLP" });
      const cartDTO = {user: cart.user, products, suma};
      return cartDTO
    }catch(err){
      throw new Error(err)
    }
  };

  async createProduct(productData) {
    products.push(new ProductModel(productData));
    return products
  };
  
  async getProducts() {
    try{
      const productsDTO = products.map(product => {
          const productDTO = new ProductDTO(
              product.uuid,
              product.name,
              product.description,
              product.category,
              product.image,
              product.price
          );
          return productDTO;
      });
      return productsDTO;
    }catch(err){
      throw new Error(err)
    }
  };

  async getProductsCategory(category) {
    try{
      const newProducts = products.filter(p => p.category === category);
      const productsDTO = newProducts.map(product => {
        const productDTO = new ProductDTO(
            product.uuid,
            product.name,
            product.description,
            product.category,
            product.image,
            product.price
        );
        return productDTO;
      })
      return productsDTO;
    }catch(err){
      throw new Error(err)
    }
  };

  async insertProduct(userEmail, productUuid) {
    try{
      carts = carts.map(cart => {
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
  };

  async deleteProduct(userEmail, productUuid) {
    try{
      carts = carts.map(cart => {
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
      throw new Error(err);
    }
  };

  async delete(userEmail) {
    try{
      const index = carts.findIndex(cart => cart.user.toString() == userEmail.toString());
      carts.splice(index, 1);
      return
    }catch(err){
      throw new Error(err)
    }
  };

};

module.exports = MemoryCartDAO;

