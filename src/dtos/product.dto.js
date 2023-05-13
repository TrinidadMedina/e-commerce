const _ = require('lodash');

const ProductDTO = class {
    constructor(uuid, name, description, category, image, price, quantity, total) {
        this.uuid = uuid;
        this.name = name;
        this.description = description;
        this.category = category;
        this.image = image;
        this.price = price.toLocaleString("es-CL", { style: "currency", currency: "CLP" });
        this.quant = quantity;
        if(!_.isNil(total)){
            this.total = total.toLocaleString("es-CL", { style: "currency", currency: "CLP" });
        }

    }
}

module.exports = ProductDTO;