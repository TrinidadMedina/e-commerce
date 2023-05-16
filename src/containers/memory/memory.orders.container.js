const fs = require('fs');
const path = require('path');
const OrderModel = require('./models/memory.order.model');
const MemoryCartDAO = require('./memory.container');
const ProductDTO = require('../../dtos/product.dto');
const OrderDTO = require('../../dtos/order.dto');
const OrderDAO =require('../../daos/order/order.dao');

class MemoryOrdersDAO extends OrderDAO{
    constructor(){
        super();
        this.path = path.join(__dirname, 'orders.txt');
    }

    async createOrder(email) {
        try{
            const memoryCartDAO = new MemoryCartDAO();
            const cart = await memoryCartDAO.getCart(email);
            const data = {
                user : cart.user,
                products : cart.products,
                total: cart.suma
            };
            const order = new OrderModel(data, this.path);
            fs.appendFileSync(this.path, JSON.stringify(order) + '\n');
            const newOrder = await this.getOrder(order.number);
            return newOrder;
        }catch(err){
            throw new Error(err);
        }
    };

    async getOrders(email) {
        try{  
            const data = fs.readFileSync(this.path, 'utf8');
            const lines = data.split('\n').filter(Boolean);
            const orders = lines.map((line) => JSON.parse(line));
            const filterOrders = orders.filter((order) => order.user == email);            
            const newOrders = filterOrders.map(order => {
                const orderDTO = new OrderDTO(
                    order.number,
                    new Date(order.timestamp),
                    order.status,
                    order.user,
                    order.products,
                    order.total  
                );
                return orderDTO;
            });
            return newOrders;
        }catch(err){
            throw new Error(err);
        }   
    };

    async getOrder(orderNumber) {
        try{
            const data = fs.readFileSync(this.path, 'utf8');
            const lines = data.split('\n').filter(Boolean);
            const order = lines.find((line) => {
              const actualOrder = JSON.parse(line);
              return actualOrder.number == orderNumber;
            });
            if(!order){
                return null;
            };
            const newOrder = JSON.parse(order);
            const orderDTO = new OrderDTO(
                newOrder.number,
                new Date(newOrder.timestamp),
                newOrder.status,
                newOrder.user,
                newOrder.products,
                newOrder.total  
            );
            return orderDTO;
        }catch(err){
            console.error(err);
            throw new Error(err);
        }   
    };
}

module.exports = MemoryOrdersDAO;