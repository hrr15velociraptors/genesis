var mongoose = require('mongoose');
var relationship = require('mongoose-relationship');
var timestamps = require('mongoose-timestamp');

var bidSchema = mongoose.Schema({
  amount: {type: Number, required: true},
  user: {type: mongoose.Schema.ObjectId, ref: 'User', childPath: 'bids'},
  auction: {type: mongoose.Schema.ObjectId, ref: 'Auction', childPath: 'bids'}
});

bidSchema.plugin(timestamps);
bidSchema.plugin(relationship, {relationshipPathName: 'user'});
bidSchema.plugin(relationship, {relationshipPathName: 'auction'});

var Bid = mongoose.model('Bid', bidSchema);

module.exports = Bid;
