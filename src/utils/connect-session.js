const session = require('express-session');
const MongoStore = require('connect-mongo');
const { getStoreConfig } = require('../config/session.config');
require('dotenv').config();

const COOKIES_SECRET = process.env.COOKIES_SECRET || 'default';

exports.session = session({
    store: MongoStore.create(getStoreConfig()),
    secret: COOKIES_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: false,
        secure: false
    }
});