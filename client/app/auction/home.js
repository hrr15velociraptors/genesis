angular.module('genesis.home', [])

.controller('HomeController', function($scope, $window, Auth, Auction) {

  //grab all auctions from database
  $scope.getAuctions = function () {
    Auction.getAuctions()
      .then(function (data) {
        console.log(data);
        $scope.allAuctions = data;
      });
  }

  //navigate to auction page using ID
  $scope.navToAuction = function (id) {
    $window.location.href= '#/auctions/' + id;
  };

  //initial load
  $scope.getAuctions();
});
