const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String
    },
    address: {
        type: String
    },
    age: {
        type: Number
    },
    number: {
        type: Number
    },
    photo: {
        type: String
    },

});

const userModel = mongoose.model('user', userSchema);
 module.exports = userModel;