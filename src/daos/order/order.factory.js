const MemoryOrderDAO = require('../../containers/memory/memory.orders.container');
const MongoOrderDAO = require('../../containers/mongo/mongo.orders.container');

class OrderDAOFactory {
  constructor() {
    if (OrderDAOFactory.instance) {
      return OrderDAOFactory.instance;
    }
    OrderDAOFactory.instance = this;
  }

  static getInstance() {
    return new OrderDAOFactory();
  }

  getOrderDAO(type) {
    switch (type) {
      case 'memory':
        return new MemoryOrderDAO();
      case 'mongo':
        return new MongoOrderDAO();
      default:
        throw new Error(`Invalid DAO type: ${type}`);
    }
  }
}

module.exports = OrderDAOFactory;