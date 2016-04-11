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
  // _creator: {type: Number, ref: 'User'},
  user: {type: mongoose.Schema.ObjectId, ref: 'User', childPath: 'auctions'},
  title: String,
  date: Number
});
auctionSchema.plugin(relationship, {relationshipPathName: 'user'});

// instantiated collections
var Auction = mongoose.model('Auction', auctionSchema);

var aaron = new User({
  // _id: 2,
  username: 'Punisher',
  password: 'frenchcheese',
  firstName: 'Frank',
  lastName: 'Castle'
});
aaron.save();

var aaronsAuction = new Auction({
  // _creator: 2,
  user: aaron._id,
  title: 'MyAuction',
  date: 100
});
aaronsAuction.save();

// User.findOne({username:'Bob'}).push({auctions: myAuction});
