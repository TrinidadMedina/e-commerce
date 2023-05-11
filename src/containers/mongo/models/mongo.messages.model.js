const { Schema, model } = require("mongoose");
const userModel = require('./mongo.user.model');

const messageSchema = new Schema(
    {   
        user: { 
            type: Schema.Types.ObjectId, 
            ref: userModel 
        },
        text: {
            type: String,
            required: true 
        },
        timestamp: {
            type: Date,
            default: () => Date.now()
        }
    },
);

const messageModel = model('messages', messageSchema);

module.exports = messageModel;