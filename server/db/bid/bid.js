var mongoose = require('mongoose');
var relationship = require('mongoose-relationship');
var timestamps = require('mongoose-timestamp');

var bidSchema = mongoose.Schema({
  amount: {type: Number, required: true},
  user: {type: mongoose.Schema.ObjectId, ref: 'User', childPath: 'bids'},
  auction: {type: mongoose.Schema.ObjectId, ref: 'Auction', childPath: 'auctions'}
});

bidSchema.plugin(timestamps);
bidSchema.plugin(relationship, {relationshipPathName: 'user'});
bidSchema.plugin(relationship, {relationshipPathName: 'auction'});
