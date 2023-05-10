const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const compression = require('compression');
const flash = require('connect-flash');
const mongooseConnect = require('./src/utils/connect-mongo');
const indexRouter = require('./src/routes/index');
const {login, signup} = require('./src/services/user/user.services');
const {session} = require('./src/utils/connect-session');
const UserModel = require('./src/containers/mongo/models/mongo.user.model');
const errorMiddleware = require('./src/middlewares/error.middleware');
const {Server: HttpServer} = require('http');
const {Server: IoServer} = require('socket.io');

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

/* const http = new HttpServer(app);
const io = new IoServer(http); */

/* io.on('connection', async socket =>{
    console.log('Nuevo cliente conectado!, id: ', socket.id);
    
    socket.on('NEW_AUTHOR_TO_SERVER', async data => {
        await author.createAuthor(data);
        const messagesHistory = await messageService.getMessages();
        socket.emit('UPDATE_MESSAGE', messagesHistory.data);
    })
    socket.on('NEW_MESSAGE_TO_SERVER', async data => {
        await messageService.createMessage(data);
        const messagesHistory = await messageService.getMessages();
        io.sockets.emit('NEW_MESSAGE_FROM_SERVER', messagesHistory.data);
    });
}) 

module.exports = http; */

//MAIN MESSAGES

/* const socket = io();

const formCreateAuthor = document.getElementById('formCreateAuthor');
const divCreateCount = document.getElementById('createCount');
const divChatBox = document.getElementById('chatBox');
divChatBox.classList.add('hidden');

let authorEmail = '';

formCreateAuthor.addEventListener('submit', e => {
    e.preventDefault()
    const author = {
        name: formCreateAuthor[0].value,
        lastname: formCreateAuthor[1].value,
        age: formCreateAuthor[2].value,
        email: formCreateAuthor[3].value,
        alias: formCreateAuthor[4].value,
        avatar: formCreateAuthor[5].value
    };
    authorEmail = formCreateAuthor[3].value,
    socket.emit('NEW_AUTHOR_TO_SERVER', author);
    formCreateAuthor.reset();
    divCreateCount.classList.add('hidden');
    divChatBox.classList.remove('hidden');
})

const formPublicarMensaje = document.getElementById('formPublicarMensaje')
formPublicarMensaje.addEventListener('submit', e => {
    e.preventDefault()
    const message = {
        authorEmail,
        text: formPublicarMensaje[0].value,
    }
    socket.emit('NEW_MESSAGE_TO_SERVER', message);
    formPublicarMensaje.reset()
})

const updateMessages = (messages) => {
    let messagesToList = '';
    if(messages == null){
        messagesToList = '<ol> Aún no hay mensajes :) <ol>'
    }else{
        messages.forEach(i => {
            messagesToList = messagesToList + `<ol> <span style="font-weight: bold">${i.author} </span> <span class= "text-secondary" style="font-size: 12px">[${i.timestamp}]</span>: <span class="font-italic">${i.text}<span></ol>`
        })
    }
    document.querySelector('#messagesList').innerHTML = messagesToList;
} 

socket.on('NEW_MESSAGE_FROM_SERVER', data => {
    updateMessages(data)
})

socket.on('UPDATE_MESSAGE', messagesArray => {
    updateMessages(messagesArray);
}) */

module.exports = app;