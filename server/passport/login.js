var LocalStrategy   = require('passport-local').Strategy;
var User = require('./../db/config').User;
var bCrypt = require('bcrypt-nodejs');

module.exports = function (passport) {
	passport.use('signin', new LocalStrategy(function (username, password, done) {
    User.findOne({username: username}, function (err, user) {
      // take care of sending tokens for client side auth with response
      if (err) {
        return done(err);
      }

      if (!user) {
        return done(null, false);
      }
      user.comparePassword(password, function (err, isMatch) {
        if (err) {
          return done(err);
        }
        if (!isMatch) {
          return done(null, false);
        }

        return done(null, user);

      });
    });
  }));
}
