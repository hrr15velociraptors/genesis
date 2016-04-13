var LocalStrategy = require('passport-local').Strategy;
var User = require('./../db/config').User;
var bCrypt = require('bcrypt-nodejs');
var jwt = require('jwt-simple');

module.exports = function (passport) {
	passport.use('signup', new LocalStrategy({
    passReqToCallback: true
  }, function (req, username, password, done) {
    User.findOne({username: username})
      .then(function (user) {
        if (user) {
          return done(new Error('User already exist!'));
        } else {
          var newUser = new User(req.body);
          newUser.save(function (err) {
            if(err) {
              return done(err);
            }
            return done(null, newUser);
          });
        }
      })
    }));
}
