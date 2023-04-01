const MongoContainer = require('../containers/mongo.container');
const cartModel = require('../utils/models/cart.model');
const productModel = require('../utils/models/product.model');

class CartsDao extends MongoContainer {
  constructor() {
    super(cartModel, productModel);
  };
};

module.exports = CartsDao;
