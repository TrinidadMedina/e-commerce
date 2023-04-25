class Cart {
  constructor(data) {
    this.uuid = data.uuid;
    this.user = data.user;
    this.products = [];
    this.timestamp = Date.now();
  }
}

module.exports = Cart;
