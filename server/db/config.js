var mongoose = require('mongoose');
var User = require('./user/user');
var Auction = require('./auction/auction');

var mongoURI = process.env.MONGOLAB_URI || 'mongodb://localhost/genesis';

mongoose.connect(mongoURI);


module.exports.User = User;
module.exports.Auction = Auction;
