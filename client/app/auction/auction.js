angular.module('genesis.auction', [])

.controller('AuctionController', function($scope, Auction, $location) {

  var id = $location.path().split("/")[2]; //domain.com/auctions/155125125215
  // console.log(id);
  // var testdata = {
  // "user": 'use that owns it',
  // "bids": 1,
  // "title": "Title of Auction",
  // "description": "Amazing auction description.  Description. Amazing auction description.  Description. tAmazing auction description.  Description. tAmazing auction description.  Description. t tem sunt rem eveniet architecto",
  // "sprice" : 500,
  // "rprice" : 300,
  // "duration": "5:00"
  // };

  $scope.bid = function () {
    console.log('bid increased');
    $scope.auctionData.sprice++;
    $scope.auctionData.bids++;
  };

  $scope.getAuction = function() {
    console.log('Calling getAuction!!!!');
    Auction.getAuction(id)
      .then(function (data) {
        console.log(data);
        $scope.auctionData = data;
      })
  };
});
