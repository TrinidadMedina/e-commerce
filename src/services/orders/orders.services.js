const ordersContainer = require('../../containers/mongo/mongo.orders.container')

class OrdersServices { 
    constructor() {};

    async createOrder (email) {
        return await ordersContainer.createOrder(email);
    }

    async getOrders(email) {
        try{
            const orders = await ordersContainer.getOrders(email);
            if(!orders){
                return null
            }
            return orders;
        }catch(err){
            throw new Error(err);
        }
    };

    async getOrder(orderNumber) {
        try{
            const order = await ordersContainer.getOrder(orderNumber);
            return order
        }catch(err){
            throw new Error(err);
        }
    };
};

module.exports = new OrdersServices();