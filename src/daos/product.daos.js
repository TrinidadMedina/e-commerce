const MongoContainer = require('../containers/mongo.container');
const productModel = require('../utils/models/product.model');

class ProductsDao extends MongoContainer {
  constructor() {
    super(productModel);
  };
};

module.exports = ProductsDao;