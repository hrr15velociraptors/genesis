var mongoose = require('mongoose');
var relationship = require('mongoose-relationship');

var auctionSchema = mongoose.Schema({
  user: {type: mongoose.Schema.ObjectId, ref: 'User', childPath: 'auctions'},
  title: String,
  date: Number
});

auctionSchema.plugin(relationship, {relationshipPathName: 'user'});
var Auction = mongoose.model('Auction', auctionSchema);

module.exports = Auction;
