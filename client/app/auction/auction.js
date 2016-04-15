angular.module('genesis.auction', [])

.controller('AuctionController', function($scope, Auction, $location) {

  var id = $location.path().split("/")[2]; //domain.com/auctions/155125125215

  $scope.bid = function () {
    console.log('bid increased');
    $scope.auctionData.sprice++;
    $scope.auctionData.bids++;
  };

  $scope.getAuction = function() {
    console.log('Calling getAuction!!!!');
    console.log(id);
    Auction.getAuction(id)
      .then(function (data) {
        console.log(data);
        $scope.auctionData = data;
      })
  };

  $scope.getAuction();
});
