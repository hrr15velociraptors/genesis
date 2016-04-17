angular.module('genesis.auction', [])

.controller('AuctionController', function($scope, $window, Auction, $location) {

  //Grabbing ID from URL
  var id = $location.path().split("/")[2]; //domain.com/auctions/15

  $scope.username = JSON.parse($window.localStorage.getItem('com.genesis')).username;
  $scope.auctionId = id;

  $scope.bid = function () {
    console.log('bid increased');
    $scope.auctionData.sprice++;
    $scope.auctionData.bids++;
  };

  //grab auction from API using URL
  $scope.getAuction = function() {
    console.log('Calling getAuction!');
    console.log(id);
    Auction.getAuction(id)
      .then(function (data) {
        console.log(data);
        $scope.auctionData = data;
        //show auction DNE error
        if (!data)  {
          $scope.DNE();
        }
      })
  };

  //Auction Not Found
  $scope.DNE = function() {
    Auction.DNE();
  };

  $scope.getAuction();
});
