const MemoryCartDAO = require('../containers/memory/memory.container');
const MongoCartDAO = require('../containers/mongo/mongo.container');

class CartDAOFactory {
  constructor() {
    if (CartDAOFactory.instance) {
      return CartDAOFactory.instance;
    }
    CartDAOFactory.instance = this;
  }

  static getInstance() {
    return new CartDAOFactory();
  }

  getCartDAO(type) {
    switch (type) {
      case 'memory':
        return new MemoryCartDAO();
      case 'mongo':
        return new MongoCartDAO();
      default:
        throw new Error(`Invalid DAO type: ${type}`);
    }
  }
}

module.exports = CartDAOFactory;