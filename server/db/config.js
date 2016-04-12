var mongoose = require('mongoose');
var User = require('./user/user');
var Auction = require('./auction/auction');
var Bid = require('./bid/bid');

var mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/genesis';

mongoose.connect(mongoURI);


module.exports.User = User;
module.exports.Auction = Auction;
module.exports.Bid = Bid;
