const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const logger = require('morgan');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const md5 = require('md5');
const compression = require('compression');

const mongooseConnect = require('./src/utils/db/connect');
const { getStoreConfig } = require('./src/services/session/session.config');
const indexRouter = require('./src/routes/index');
const errorHandler = require('./src/middlewares/errorHandler');
const loggerConsole = require('./log4js').loggerConsole;
const loggerFile = require('./log4js').loggerFile;

const UserModel = require('./src/models/user.model');

require('dotenv').config();

const app = express();

const COOKIES_SECRET = process.env.COOKIES_SECRET || 'default';

app.use(compression());

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(logger('dev'));

mongooseConnect();

app.use(cookieParser(COOKIES_SECRET));

app.use(session({
    store: MongoStore.create(getStoreConfig()),
    secret: COOKIES_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
        httpOnly: false,
        secure: false
    }
}));

app.set('views', './views');
app.set('view engine', 'ejs');

passport.use('login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
},
async (email, password, done) => {
    const userData = await UserModel.findOne({email:email, password: md5(password)});
    if(!userData){
       return done(null, false);
    }
    done(null, userData)
}));

passport.use('signup', new LocalStrategy({
    passReqToCallback: true,
    usernameField: 'email',
    passwordField: 'password'
}, async (req, email, password, done) => {
    const userData = await UserModel.findOne({email: email, password: md5(password)});
    if(userData){
        return done(null, false);
    }
    const stageUser = new UserModel({
        email: req.body.email,
        password: md5(password),
        username: req.body.username,
        address: req.body.address,
        age: req.body.age,
        number: req.body.number,
        photo: req.body.photo
    });
    const newUser = await stageUser.save();
    done(null, newUser);
}));

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    const userData = await UserModel.findById(id);
    done(null, userData);
});

app.use(passport.initialize());
app.use(passport.session())

app.use(indexRouter);

app.use(errorHandler);

module.exports = app;