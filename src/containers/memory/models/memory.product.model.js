class product {
    constructor({uuid, name, description, category, image, price, stock }) {
        this.uuid = uuid;
        this.name = name;
        this.description = description;
        this.category = category;
        this.image = image;
        this.price = price;
        this.stock = stock;
        this.timestamp = Date.now();
    }
}
  
module.exports = product;