var LocalStrategy = require('passport-local').Strategy;
var User = require('./../db/config').User;
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport){

	passport.use('signup', new LocalStrategy(function(username, password, done) {
    User.findOne({username: username})
      .then(function (user) {
        if (user) {
          return done(new Error('User already exist!'));
        } else {
          var newUser = new User({
            username: username,
            password: password
          });
          newUser.save(function(err) {
            if(err) {
              return done(err);
            }
            console.log('Create new user session here!');
            return done(null, newUser);
          });
        }
      })
    }));
}
