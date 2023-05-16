const OrderDAOFactory = require('../../daos/order/order.factory');
const daoType = process.argv[2] || 'mongo';

class OrdersServices { 
    constructor() {
        const factory = OrderDAOFactory.getInstance();
        this.dao = factory.getOrderDAO(daoType);
    };

    async createOrder (email) {
        return await this.dao.createOrder(email);
    }

    async getOrders(email) {
        try{
            const orders = await this.dao.getOrders(email);
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
            const order = await this.dao.getOrder(orderNumber);
            return order
        }catch(err){
            throw new Error(err);
        }
    };
};

module.exports = new OrdersServices();