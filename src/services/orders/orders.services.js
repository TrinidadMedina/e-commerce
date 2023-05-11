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
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            const newOrders = orders.map( order => {
                const date = new Date(order.timestamp);
                const dateFormatted = date.toLocaleDateString(undefined, options);
                order.date = dateFormatted;
                return order;
            })
            return newOrders;
        }catch(err){
            throw new Error(err);
        }
    };

    async getOrder(orderNumber) {
        try{
            const order = await ordersContainer.getOrder(orderNumber);
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            const date = new Date(order.timestamp);
            const dateFormatted = date.toLocaleDateString(undefined, options);
            order.date = dateFormatted;
            return order
        }catch(err){
            throw new Error(err);
        }
    };
};

module.exports = new OrdersServices();