var LocalStrategy = require('passport-local').Strategy;
var User = require('./../db/config').User;
var bCrypt = require('bcrypt-nodejs');
var jwt = require('jwt-simple');
module.exports = function(passport){

	passport.use('signup', new LocalStrategy(function (username, password, done) {
    User.findOne({username: username})
      .then(function (user) {
        if (user) {
          return done(new Error('User already exist!'));
        } else {
          var newUser = new User({
            username: username,
            password: password
          });
          newUser.save(function (err) {
            if(err) {
              return done(err);
            }
            var token = jwt.encode(user, 'vodka');
            newUser.access_token = token;
            return done(null, newUser);
          });
        }
      })
    }));
}
