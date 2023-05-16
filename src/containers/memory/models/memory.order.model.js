const fs = require('fs');

class Order {
  constructor(data, path) {
    this.number = this.generateOrderNumber(path);
    this.user = data.user;
    this.products = data.products;
    this.status = 'generada';
    this.total = data.total;
    this.timestamp = Date.now();
  }

  generateOrderNumber(path) {
    const orders = this.getAllOrders(path);
    const lastOrder = orders[orders.length - 1];
    const lastOrderNumber = lastOrder ? lastOrder.number : 0;
    const newOrderNumber = lastOrderNumber + 1;
    return newOrderNumber;
  }

  getAllOrders(path) {
    const data = fs.readFileSync(path, 'utf8');
    const lines = data.split('\n').filter(Boolean);
    const orders = lines.map((line) => JSON.parse(line));
    return orders;
  }
}

module.exports = Order;