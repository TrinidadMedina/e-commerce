const mongoose = require('mongoose');
const { getMongoConfig } = require('../../services/session/session.config');

const mongooseConnect = () => {
    const MONGO_URI = process.env.MONGO_URI;
    mongoose.set("strictQuery", false);
    mongoose.connect(MONGO_URI, getMongoConfig()).then(() => {
        console.info('Mongoose connection ok');
    }).catch(err => {
        console.error(err.message);
        process.exit();
    })    
};

module.exports = mongooseConnect;