var mongoose = require('mongoose');
var relationship = require('mongoose-relationship');
var timestamps = require('mongoose-timestamp');

var bidSchema = mongoose.Schema({
  price: Number,
  user: {type: mongoose.Schema.ObjectId, ref: 'User'},
  auction: {type: mongoose.Schema.ObjectId, ref: 'Auction'}
});

bidSchema.plugin(timestamps);
bidSchema.plugin(relationship, {relationshipPathName: 'user'});
bidSchema.plugin(relationship, {relationshipPathName: 'auction'});
