const _ = require('lodash');

const options = { year: 'numeric', month: 'long', day: 'numeric' };

const OrderDTO = class {
    constructor(number, timestamp, status, user, products, total) {
        this.number = number;
        this.timestamp = timestamp.toLocaleDateString(undefined, options);
        this.status = status;
        this.user = user;
        this.products = products;
        this.total = total.toLocaleString("es-CL", { style: "currency", currency: "CLP" });
    };
};

module.exports = OrderDTO;