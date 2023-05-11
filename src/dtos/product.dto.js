const ProductDTO = class {
    constructor(uuid, name, description, image, price, quantity, total) {
        this.uuid = uuid;
        this.name = name;
        this.description = description;
        this.image = image;
        this.price = price;
        this.quant = quantity;
        this.total = total
    }
}

module.exports = ProductDTO;