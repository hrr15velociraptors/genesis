var signin = require('./signin');
var signup = require('./signup');
var jwt = require('./jwt');
var User = require('./../db/config').User;

module.exports = function(passport){

	// Passport needs to be able to serialize and deserialize users to support persistent login sessions
  passport.serializeUser(function(user, done) {
    console.log('serializing user: ');
    done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        console.log('deserializing user:', user);
        done(err, user);
    });
  });

  // Setting up Passport Strategies for Login and SignUp/Registration
  signin(passport);
  signup(passport);
  jwt(passport);
}
