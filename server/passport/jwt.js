var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var User = require('../db/config').User;

// Setup work and export for the JWT passport strategy
module.exports = function (passport) {
  var opts = {};
  opts.jwtFromRequest = function (req) {
    // has to return token as string
    return req.headers['x-access-token'];
  };
  opts.secretOrKey = 'vodka';
  passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
    User.findOne({_id: jwt_payload._doc._id}, function (err, user) {
      if (err) {
        return done(err, false);
      }
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    });
  }));
};
