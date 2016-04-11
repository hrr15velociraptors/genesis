var promise = require('bluebird');
var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');
var relationship = require('mongoose-relationship');

var mongoURI = process.env.MONGOLAB_URI || 'mongodb://localhost/genesis';
mongoose.connect(mongoURI);

var userSchema = mongoose.Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  salt: String,
  email: String,
  firstName: String,
  lastName: String,
  auctions: [{type: mongoose.Schema.ObjectId, ref: 'Auction'}]
});

var User = mongoose.model('User', userSchema);

var auctionSchema = mongoose.Schema({
  user: {type: mongoose.Schema.ObjectId, ref: 'User', childPath: 'auctions'},
  title: String,
  date: Number
});

auctionSchema.plugin(relationship, {relationshipPathName: 'user'});
var Auction = mongoose.model('Auction', auctionSchema);

module.exports.User = User;
module.exports.Auction = Auction;
