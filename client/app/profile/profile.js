angular.module('genesis.profile',  [])
.controller('ProfileController', function ($scope, User, $window) {
  $scope.user = {};
  User.getUserData().then(function (userData) {
    console.log(userData);
    $scope.user = userData;
  });

  $scope.navToAuction = function (id) {
    $window.location.href= '#/auctions/' + id;
  };

})


.controller('CreateAucController', function ($scope, $http, $state, Auction, $window) {
  $scope.auction = {};

  $scope.createAuction = function () {
    Auction.createAuction($scope.auction).then(function (data) {
      $('.modal').modal('hide'); //  hide bootstrap modal (the gray background)
      $window.location.href= '#/auctions/' + data.auctionId; // change location to auctions/id
    });
  }
});
