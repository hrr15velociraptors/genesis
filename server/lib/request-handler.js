var jwt = require('jsonwebtoken');
var db = require('./../db/config');
var Bid = db.Bid;
var Auction = db.Auction;
var User = db.User;

module.exports.postBid = function (req, res) {
  new Bid(req.body).save(function () {
    res.status(200).send('ok');
  });
}

module.exports.deleteBid = function (req, res) {
  res.status(200).send('ok');
}

module.exports.postAuction = function (req, res) {
  new Auction(req.body).save(function () {
    res.status(200).send('ok');
  });
}

module.exports.getAuction = function (req, res) {
  // API endpoint = /auctions/:id
  
  // authenticate with jwt
  var id = req.params;
  // send auction data associated with id value
  res.send(200).send('sending auction data');
}

module.exports.getAuctions = function (req, res) {
  
};

module.exports.modifyAuction = function (req, res) {
  res.status(200).send('ok');

}

module.exports.deleteAuction = function (req, res) {
  res.status(200).send('ok');
}

module.exports.getUserInfo = function (req, res) {
  res.json(req.user);
}

module.exports.signin = function (req, res) {
  var token = jwt.sign(req.user, 'vodka');
  res.send({'token': token, username: req.user.username});
}

module.exports.signup = function (req, res) {
  var token = jwt.sign(req.user, 'vodka');
  res.send({'token': token, username: req.user.username});
}
