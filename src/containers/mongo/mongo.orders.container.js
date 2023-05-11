const orderModel = require('./models/mongo.orders.model');
const userModel = require('./models/mongo.user.model');
const cartModel = require('./models/mongo.cart.model');

class OrdersContainer{
    constructor(){}

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
            return order;
        }catch(err){
            throw new Error(err);
        }
    };

    async getOrders(email) {
        try{
            const user = await userModel.findOne({email: email});
            const orders = await orderModel.find({user: user._id})
            .populate('user')
            .populate('products.product')

            if(orders.length === 0){
                return null
            }
            return orders
        }catch(err){
            throw new Error(err);
        }   
    };

    async getOrder(orderNumber) {
        try{
            const order = await orderModel.findOne({number: orderNumber})
            .populate('user')
            .populate('products.product')

            if(!order){
                return null
            }
            return order
        }catch(err){
            console.error(err);
            throw new Error(err);
        }   
    };
}

module.exports = new OrdersContainer();