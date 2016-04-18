angular.module('genesis.home', ['ngAnimate', 'ui.bootstrap'])

.controller('HomeController', function($scope, $window, Auth, Auction) {

  //grab all auctions from database
  $scope.getAuctions = function () {
    Auction.getAuctions()
      .then(function (data) {
        $scope.allAuctions = data;
      });
  }

  //navigate to auction page using ID
  $scope.navToAuction = function (id) {
    $window.location.href= '#/auctions/' + id;
  };

  //initial load
  $scope.getAuctions();
  
  // carousel params
  $scope.myInterval = 2000;
  $scope.noWrapSlides = false;
  $scope.active = 0;

});