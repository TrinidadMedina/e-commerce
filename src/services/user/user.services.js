const LocalStrategy = require('passport-local').Strategy;
const md5 = require('md5');
const UserModel = require('../../containers/mongo/models/mongo.user.model');
const {sendMail} = require('../../utils/nodemailer');
const UserDTO = require('../../dtos/user.dto');

exports.login = new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password'
    },
    async (email, password, done) => {
        const userEmail = await UserModel.findOne({email:email});
        if(!userEmail){
            return done(null, false, {message: 'Usuario no encontrado'});
        }
        const userPass = await UserModel.findOne({password: md5(password)});
        if(!userPass){
            return done(null, false, {message: 'Contraseña incorrecta'});
        }
        const userDTO = new UserDTO(
            userEmail.email, 
            userEmail.username, 
            userEmail.address, 
            userEmail.age, 
            userEmail.number, 
            userEmail.image
        )
        done(null, userDTO)
    })

exports.signup = new LocalStrategy(
    {
        passReqToCallback: true,
        usernameField: 'email',
        passwordField: 'password'
    }, 
    async (req, email, password, done) => {
        const userData = await UserModel.findOne({email: email});
        if(userData){
            return done(null, false,  {message: 'Usuario ya existe'});
        }
        //const rutaImagen = '/images/' + req.file.filename;
        const stageUser = new UserModel({
            email: req.body.email,
            password: md5(password),
            username: req.body.username,
            address: req.body.address,
            age: req.body.age,
            number: req.body.number,
            //image: rutaImagen
            image: req.body.image
        });
        const newUser = await stageUser.save();
        const userDTO = new UserDTO(
            newUser.email, 
            newUser.username, 
            newUser.address, 
            newUser.age, 
            newUser.number, 
            newUser.image
        )
        done(null, userDTO);
        sendMail('nuevo registro', JSON.stringify(userDTO));   
    }
);
