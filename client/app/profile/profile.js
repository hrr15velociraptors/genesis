angular.module('genesis.profile',  [])
.controller('ProfileController', function ($scope, User, $window) {
  $scope.user = {};
  User.getUserData().then(function (userData) {
    $scope.user = userData;
  });

  $scope.navToAuction = function (id) {
    $window.location.href= '#/auctions/' + id;
  };

})


.controller('CreateAucController', function ($scope, $http, $state, Auction, $window) {
  $scope.auction = {};

  $scope.createAuction = function () {
    $scope.auction.owner = JSON.parse($window.localStorage.getItem('com.genesis')).username;
    $scope.auction.cprice = $scope.auction.sprice;
    Auction.createAuction($scope.auction).then(function (data) {
      $('.modal').modal('hide'); //  hide bootstrap modal (the gray background)
      $window.location.href= '#/auctions/' + data.auctionId; // change location to auctions/id
    });
  }
});
