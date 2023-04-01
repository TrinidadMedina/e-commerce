const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const md5 = require('md5');
const UserModel = require('../utils/models/user.model');


exports.login = new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password'
    },
    async (email, password, done) => {
        const userMail = await UserModel.findOne({email:email});
        if(!userMail){
            return done(null, false, {message: 'Usuario no encontrado'});
        }
        const userPass = await UserModel.findOne({password: md5(password)});
        if(!userPass){
            return done(null, false, {message: 'Contraseña incorrecta'});
        }
        done(null, userMail)
    })

exports.signup =
new LocalStrategy({
    passReqToCallback: true,
    usernameField: 'email',
    passwordField: 'password'
}, async (req, email, password, done) => {
    const userData = await UserModel.findOne({email: email, password: md5(password)});
    if(userData){
        return done(null, false,  {message: 'Usuario ya existe'});
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
})
