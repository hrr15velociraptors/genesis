var mongoose = require('mongoose');
var relationship = require('mongoose-relationship');
var timestamps = require('mongoose-timestamp');

var auctionSchema = mongoose.Schema({
  user: {type: mongoose.Schema.ObjectId, ref: 'User', childPath: 'auctions'},
  bids: [{type: mongoose.Schema.ObjectId, ref: 'Bid', childPath: 'auction'}],
  title: {type: String, required: true}
});

auctionSchema.plugin(timestamps);
auctionSchema.plugin(relationship, {relationshipPathName: 'user'});

var Auction = mongoose.model('Auction', auctionSchema);

module.exports = Auction;
