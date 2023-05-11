const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const compression = require('compression');
const flash = require('connect-flash');
const cors = require("cors");
const path = require('path')
const mongooseConnect = require('./src/utils/connect-mongo');
const indexRouter = require('./src/routes/index');
const {login, signup} = require('./src/services/user/user.services');
const {session} = require('./src/utils/connect-session');
const UserModel = require('./src/containers/mongo/models/mongo.user.model');
const errorMiddleware = require('./src/middlewares/error.middleware');
const messagesServices = require('./src/services/messages/messages-services');
//const loggerConsole = require('./src/utils/log4js').loggerConsole;
require('dotenv').config();

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const COOKIES_SECRET = process.env.COOKIES_SECRET || 'default';

app.use(compression());
app.use(cors());

/* app.use(express.static('public'));
app.use('/images', express.static('public/images')); */

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(logger('dev'));

mongooseConnect();

app.use(cookieParser(COOKIES_SECRET));

app.use(session);

app.set('views', path.join(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

passport.use('login', login);

passport.use('signup', signup);

passport.serializeUser((user, done) => {
    done(null, user.email);
});

passport.deserializeUser(async (email, done) => {
    const userData = await UserModel.findOne({email: email});
    done(null, userData);
});

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
app.use(indexRouter);

app.use(errorMiddleware);

io.on('connection', async socket =>{
    //loggerConsole.info(`Nuevo cliente conectado: ${socket.id}`);
    const messagesHistory = await messagesServices.getMessages();
    socket.emit('updatedMessages', messagesHistory);
    socket.on('mensajeCliente', async data => {
        await messagesServices.createMessage(data);
        const messagesHistory = await messagesServices.getMessages();
        io.emit('mensajeServidor', messagesHistory);
    });
});

module.exports = { server };
