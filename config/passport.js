const Jwtstrategy = require('passport-jwt').Strategy;
const extractjwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const users = mongoose.model('users');
const keys = require('./keys');

const opts={}
opts.jwtFromRequest = extractjwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretorkey;

module.exports = passport =>  {
    passport.use(new Jwtstrategy(opts,(payload,done) => {
         users.findById(payload.id)
             .then(user => {
                 if(user)
                {
                    console.log(user)
                    return done(null,user)
                }
              return done(null,false)  
        })
        .catch(err => console.log(err))
    }))
}