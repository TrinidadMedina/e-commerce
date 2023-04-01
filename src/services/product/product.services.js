const {v4 : uuidv4} = require('uuid');
const DaoService = require('../../daos/product.daos');

class ProductServices {
    constructor() {
      this.dao = new DaoService();
    };

    async createProduct(data) {
        Object.assign(data, {
            uuid: uuidv4()
        });
      const newProduct = await this.dao.createProduct(data);
      return newProduct;
    };

    async getProducts() {
      const products = await this.dao.getAll();
      return products;
    };

    async getProduct(uuid) {
      const product = await this.dao.getOne(uuid);
      return product;
    }

    async deleteProduct(uuid) {
      const deletedProduct = await this.dao.delete(uuid);
      return deletedProduct;
    };
};

module.exports = new ProductServices();