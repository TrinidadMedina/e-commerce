const { Schema, model } = require('mongoose');
const productModel = require('./product.model');
const userModel = require('./user.model');

const cartSchema = new Schema({
    uuid: {
        type: String,
        required: true,
        unique: true
    },
    user: { 
        type: Schema.Types.ObjectId, 
        ref: userModel 
    },
    products: [{
        product: {
            type: Schema.Types.ObjectId, 
            ref: productModel 
        },
        quant: {
            type: Number ,
            default: 1
        }       
    }],
    timestamp: {
        type: Date,
        default: () => Date.now() / 1000,
    }
});

const cartModel = model('carts', cartSchema);

module.exports = cartModel;