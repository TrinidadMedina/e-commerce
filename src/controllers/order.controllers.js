const ordersServices = require('../services/orders/orders.services')

exports.getOrder = async (req, res, next) => {
    try{
        const userData = req.user;
        const {orderNumber} = req.query;
        const data = await ordersServices.getOrder(orderNumber);
        res.render('one-order', {options: data, userData, error: null});
    }catch(err){
        next(err);
    }
};