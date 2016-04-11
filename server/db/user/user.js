var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var relationship = require('mongoose-relationship');

var userSchema = mongoose.Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  salt: String,
  email: String,
  firstName: String,
  lastName: String,
  auctions: [{type: mongoose.Schema.ObjectId, ref: 'Auction'}]
});

userSchema.pre('save', function (next) {
  var user = this;
  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();
  // generate a salt
  bcrypt.genSalt(10, function(err, salt) {
    if (err) return next(err);
    // hash the password using our new salt
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) next(err);
      // override the cleartext password with the hashed one
      user.password = hash;
      next()
    });
  });
});

userSchema.methods.comparePassword = function(attemptedPassword, callback) {
  bcrypt.compare(attemptedPassword, this.password, function(err, isMatch) {
    if (err) {
      callback(err)
    }
    callback(null, isMatch);
  });
};

var User = mongoose.model('User', userSchema);

module.exports = User;
