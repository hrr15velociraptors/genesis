var db = require('./../db/config');
var Bid = db.Bid;
var Auction = db.Auction;
var User = db.User;

var Scheduler = function (date, auctionId) {
  this.date = new Date(date);
  this.auctionId = auctionId;
  this.run();
}

Scheduler.prototype.run = function () {
  var interval = setInterval(function () {
    var date = new Date();
    if (date.getDate() === this.date.getDate() && date.getHours() === this.date.getHours() && date.getMinutes() === this.date.getMinutes()) { // if auction ended
        clearInterval(interval);
        this.done();
    }
  }.bind(this), 60000); // run every minute
}

Scheduler.prototype.done = function () {
  Auction.findById(this.auctionId, function (err, auction) {
    if (err) {
      console.log(err)
    }
    Bid.find({
     '_id': { $in: auction.bids }
     }, function(err, bids){
         if(err) {
           console.log(err);
         }
         var highest = auction.sprice;
         var winner = null;
         bids.forEach(function (bid) {
          if (bid.amount > highest) {
            highest = bid.amount;
            winner = bid.user;
          }
         });
         console.log(highest, winner);
       });
  })
}

module.exports.Scheduler = Scheduler;
