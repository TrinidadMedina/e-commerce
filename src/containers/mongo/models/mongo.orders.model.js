const { Schema, model } = require('mongoose');
const userModel = require('./mongo.user.model');
const productModel = require('./mongo.product.model');
const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const orderSchema = new Schema({
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
        },
        total: {
            type: Number
        }     
    }],
    status: {
        type: String,
        default: 'generada'
    },
    total: {
        type: Number,
    },
    timestamp: {
        type: Date,
        default: () => Date.now()
    }
});

orderSchema.plugin(AutoIncrement, { inc_field: 'number' });

const orderModel = model('orders', orderSchema);

module.exports = orderModel;
