const MongoContainer = require('../container/mongo.container');
const cartModel = require('../models/cart.model');
const productModel = require('../models/product.model');

class CartsDao extends MongoContainer {
  constructor() {
    super(cartModel, productModel);
  };
};

module.exports = CartsDao;
