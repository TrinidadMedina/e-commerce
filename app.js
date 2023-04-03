const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const compression = require('compression');
const flash = require('connect-flash');
const mongooseConnect = require('./src/utils/connect-mongo');
const indexRouter = require('./src/routes/index');
const {login, signup} = require('./src/config/passport');
const {session} = require('./src/utils/connect-session');
const UserModel = require('./src/utils/models/user.model');
const errorMiddleware = require('./src/middlewares/error.middleware');

require('dotenv').config();

const app = express();

const COOKIES_SECRET = process.env.COOKIES_SECRET || 'default';

app.use(compression());

app.use(express.static('public'));
app.use('/images', express.static('public/images'));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(logger('dev'));

mongooseConnect();

app.use(cookieParser(COOKIES_SECRET));

app.use(session);

app.set('views', './src/views');
app.set('view engine', 'ejs');

passport.use('login', login);

passport.use('signup', signup);

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    const userData = await UserModel.findById(id);
    done(null, userData);
});

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
app.use(indexRouter);

app.use(errorMiddleware);

module.exports = app;