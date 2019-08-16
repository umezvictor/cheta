//here is where the token issued to the user at login will be verified usine jwt strategy

//this file is used in creating protected routes, 

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/User');
const config = require('../config/keys');

//options for handling the token, check passport documentation
const opts = {};
//extract the token assigned to the user on login
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.JWT_SECRET;


 //passport is the parameter, its used in server.js, must be passport, can't say why yet
//tried mypassport, app crashed. Oya move on

module.exports = passport => {
    passport.use(
        new JwtStrategy(opts, (jwt_payload, done) => {
        //console.log(jwt_payload);
        //find the user whose id is in the payload
        User.findById(jwt_payload.id)
            .then(user => {
                if(user){
                    return done(null, user);
                }
                return done(null, false);
            })
            .catch(err => console.log(err));
    })
    );
};

