const MongoContainer = require('../container/mongo.container');
const productModel = require('../models/product.model');

class ProductsDao extends MongoContainer {
  constructor() {
    super(productModel);
  };
};

module.exports = ProductsDao;