const {v4 : uuidv4} = require('uuid');
const DaoService = require('../../daos/cart.daos');
let instance = null;
  
class CartServices { 
    constructor() {
        this.dao = new DaoService();
    };

    async createCart(userId, productId) {
        const data = {uuid: uuidv4(), user: userId, products : {product: productId}};
        const newCart = await this.dao.create(data);
        return newCart;
    };

    async getCarts(userId) {
        const carts = await this.dao.getAll(userId);
        return carts;
    };

/*     async getCart(uuid) {
        const cart = await this.dao.getOne(uuid);
        return cart;
    }; */

    async insertProduct(userId, productId) {
        const cart = await this.dao.insertProduct(userId, productId);
        return cart;
    };

    async deleteProduct(userId, productId) {
        const cart = await this.dao.deleteProduct(userId, productId);
        return cart;
    };

    async deleteCart(userId) {
        const cart = await this.dao.delete(userId);
        return cart;
    };

    static getInstance() {
        if(!instance){
            instance = new CartServices();
        }
        return instance;
    }
};

module.exports = CartServices;