var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/genesis';

var connection = mongoose.connect(mongoURI);
autoIncrement.initialize(connection);

var User = require('./user/user');
var Auction = require('./auction/auction');
var Bid = require('./bid/bid');

module.exports.User = User;
module.exports.Auction = Auction;
module.exports.Bid = Bid;
