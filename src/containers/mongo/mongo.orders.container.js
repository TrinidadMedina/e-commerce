const orderModel = require('./models/mongo.orders.model');
const userModel = require('./models/mongo.user.model');
const cartModel = require('./models/mongo.cart.model');
const ProductDTO = require('../../dtos/product.dto');
const UserDTO = require('../../dtos/user.dto');
const OrderDTO = require('../../dtos/order.dto');
const OrderDAO = require('../../daos/order/order.dao');

class MongoOrdersDAO extends OrderDAO {
    constructor(){
        super();
    }

    async createOrder(email) {
        try{
            const user = await userModel.findOne({email: email});
            const cart = await cartModel.findOne({user: user._id}).populate('products.product');
            let suma = 0;
            const newProducts =cart.products.map(prod => {
                const total = prod.quant * prod.product.price;
                suma += total;
                return { ...prod.toObject(), total };
            })
            const data = {
                user : user._id,
                products : newProducts,
                total: suma
            };
            const order = await orderModel.create(data);
            const newOrder = await this.getOrder(order.number);
            return newOrder;
        }catch(err){
            throw new Error(err);
        }
    };

    async getOrders(email) {
        try{
            const user = await userModel.findOne({email: email});
            const orders = await orderModel.find({user: user._id})
            .populate('user')
            .populate('products.product');
            if(orders.length === 0){
                return null;
            }
            const ordersCopy = [...orders];
            const newOrders = ordersCopy.map(order => {
                const userDTO = new UserDTO(
                    order.user.email,
                    order.user.username,
                    order.user.address,
                    order.user.age,
                    order.user.number,
                    order.user.image
                );
                const products = order.products.map(product => {
                    const productData = product.product;
                    const productDTO = new ProductDTO(
                        productData.uuid,
                        productData.name,
                        productData.description,
                        productData.category,
                        productData.image,
                        productData.price,
                        product.quant,
                        product.total
                    );
                    return productDTO;
                });
                const orderDTO = new OrderDTO(
                    order.number,
                    new Date(order.timestamp),
                    order.status,
                    userDTO,
                    products,
                    order.total  
                );
                return orderDTO;
            });
            return newOrders
        }catch(err){
            throw new Error(err);
        }   
    };

    async getOrder(orderNumber) {
        try{
            const order = await orderModel.findOne({number: orderNumber})
            .populate('user')
            .populate('products.product');
            if(!order){
                return null;
            }
            const userDTO = new UserDTO(
                order.user.email,
                order.user.username,
                order.user.address,
                order.user.age,
                order.user.number,
                order.user.image
            );
            const products = order.products.map(product => {
                const productData = product.product;
                const productDTO = new ProductDTO(
                    productData.uuid,
                    productData.name,
                    productData.description,
                    productData.category,
                    productData.image,
                    productData.price,
                    product.quant,
                    product.total
                );
                return productDTO;
            });
            const orderDTO = new OrderDTO(
                order.number,
                new Date(order.timestamp),
                order.status,
                userDTO,
                products,
                order.total  
            );
            return orderDTO;
        }catch(err){
            console.error(err);
            throw new Error(err);
        }   
    };
}

module.exports = MongoOrdersDAO;