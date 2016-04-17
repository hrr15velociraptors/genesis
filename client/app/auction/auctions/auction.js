angular.module('genesis.auction', [])

.controller('AuctionController', function($scope, $window, Auction, $location) {

  //Grabbing ID from URL
  var id = $location.path().split("/")[2]; //domain.com/auctions/15

  $scope.username = JSON.parse($window.localStorage.getItem('com.genesis')).username;
  $scope.auctionId = id;
  $scope.bidData = {};

  $scope.bid = function () {
    $('#bid-btn').prop("disabled", true);
    $scope.bidData.amount = Math.round($scope.auctionData.cprice + $scope.auctionData.cprice * 0.01, 2);
    Auction.bid($scope.bidData).then(function (res) {
      $('#bid-btn').prop("disabled", false);
      $scope.auctionData = res.data;
    });
  };

  //grab auction from API using URL
  $scope.getAuction = function() {
    Auction.getAuction(id)
      .then(function (data) {
        $scope.auctionData = data;
        $scope.bidData.auction = data._id;
        $scope.bidData.amount = data.cprice;
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
