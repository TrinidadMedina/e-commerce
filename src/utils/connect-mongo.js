const mongoose = require('mongoose');
const { getMongoConfig } = require('../config/session.config');
const loggerConsole = require('./log4js').loggerConsole;
const loggerFile = require('./log4js').loggerFile;

const mongooseConnect = () => {
    const MONGO_URI = process.env.MONGO_URI;
    mongoose.set("strictQuery", false);
    mongoose.connect(MONGO_URI, getMongoConfig()).then(() => {
        loggerConsole.info('Mongoose connection ok');
    }).catch(err => {
        loggerFile.error(err.message)
        process.exit();
    })    
};

module.exports = mongooseConnect;