var mongoose = require('mongoose');
var relationship = require('mongoose-relationship');
var timestamps = require('mongoose-timestamp');
var autoIncrement = require('mongoose-auto-increment');

var auctionSchema = mongoose.Schema({
  user: {type: mongoose.Schema.ObjectId, ref: 'User', childPath: 'auctions'},
  bids: [{type: mongoose.Schema.ObjectId, ref: 'Bid', childPath: 'auction'}],
  title: {type: String, required: true},
  description: {type: String, required: true},
  duration: {type: String, required: true},
  end: {type: Date},
  sprice: {type: Number, required: true},
  rprice: {type: Number, required: true},
  auctionId: {type: Number, default: 0},
  owner: {type: String, require: true}
});

auctionSchema.pre('save', function (next) {
  var auction = this;

  auction.end = new Date(new Date(auction.createdAt).getTime() + auction.duration * 60000);
  next();

});
auctionSchema.plugin(timestamps);
auctionSchema.plugin(relationship, {relationshipPathName: 'user'});

auctionSchema.plugin(autoIncrement.plugin, { model: 'Auction', field: 'auctionId' });

var Auction = mongoose.model('Auction', auctionSchema);

module.exports = Auction;
