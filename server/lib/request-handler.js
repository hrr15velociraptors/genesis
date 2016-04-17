var jwt = require('jsonwebtoken');
var db = require('./../db/config');
var Bid = db.Bid;
var Auction = db.Auction;
var User = db.User;

module.exports.postBid = function (req, res) {
  var bid = req.body;
  bid.user = req.user._id;
  new Bid(req.body).save(function () {
    Auction.findOneAndUpdate({_id: bid.auction}, {$set: {cprice: bid.amount}}, {new: true}, function (err, auction) {
      if (err) {
        res.status(404).send('err');
      }
      res.json(auction);
    });
  });
}

module.exports.deleteBid = function (req, res) {
  res.status(200).send('ok');
}

module.exports.postAuction = function (req, res) {
  var auction = req.body;
  auction.user = req.user._id;
  new Auction(auction).save(function (err, newAuction) {
    if (err) {
      console.log(err);
    }
    res.json(newAuction);
  });
}

module.exports.getAuction = function (req, res) {
  Auction.find({auctionId: req.params.id}, function (err, auction) {
    if(err) {
      console.log(err);
    }
    res.json(auction);
  })
}

module.exports.getAuctions = function (req, res) {
  // return all auctions in database
  Auction.find({}, function (err, auctions) {
    if(err) {
      console.log(err);
    }
    res.json(auctions);
  })
};

module.exports.modifyAuction = function (req, res) {
  // not done yet
  res.status(200).send('ok');

}

module.exports.deleteAuction = function (req, res) {
  // not done yet
  res.status(200).send('ok');
}

module.exports.getProfileInfo = function (req, res) {
  var auctionsIDS = req.user.auctions;
  var profileData  = {
    username: req.user.username,
    email: req.user.email,
    firstName: req.user.firstName,
    lastName: req.user.lastName
  };
  Auction.find({
    '_id': { $in: req.user.auctions }
  }, function(err, auctions) {
      if(err) {
        console.log(err);
      }
      profileData.auctions = auctions;
      Bid.find({
     '_id': { $in: req.user.bids }
     }, function(err, bids){
         if(err) {
           console.log(err);
         }
         profileData.bids = bids;
         res.json(profileData);
       });
  });
}

module.exports.signin = function (req, res) {
  var token = jwt.sign(req.user, 'vodka');
  res.send({'token': token, username: req.user.username});
}

module.exports.signup = function (req, res) {
  var token = jwt.sign(req.user, 'vodka');
  res.send({'token': token, username: req.user.username});
}
