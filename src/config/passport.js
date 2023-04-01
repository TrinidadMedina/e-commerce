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
        const userData = await UserModel.findOne({email:email, password: md5(password)});
        if(!userData){
            return done(null, false);
        }
        done(null, userData)
    })


exports.signup =
new LocalStrategy({
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
})

/* passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    const userData = await UserModel.findById(id);
    done(null, userData);
});

app.use(passport.initialize());
app.use(passport.session()) */