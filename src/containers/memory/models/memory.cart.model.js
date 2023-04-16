class Cart {
  constructor(data) {
    this._id = data.uuid;
    this.user = data.user;
    this.products = [];
    this.timestamp = Date.now();
  }

/*   addProduct(product, quantity = 1) {
    const index = this.products.findIndex((p) => p.product._id === product._id);
    if (index >= 0) {
      this.products[index].quant += quantity;
    } else {
      this.products.push({ product, quant: quantity });
    }
  }

  removeProduct(productId, quantity = 1) {
    const index = this.products.findIndex((p) => p.product._id === productId);
    if (index >= 0) {
      if (this.products[index].quant > quantity) {
        this.products[index].quant -= quantity;
      } else {
        this.products.splice(index, 1);
      }
    }
  } */

/*   getTotal() {
    return this.products.reduce((total, p) => total + p.product.price * p.quant, 0);
  } */
}

module.exports = Cart;
