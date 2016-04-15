angular.module('genesis.profile',  [])
.controller('ProfileController', function ($scope, User) {
  $scope.user = {};

  User.getUserData().then(function (userData) {
    $scope.user = userData;
  });
})
.controller('CreateAucController', function ($scope, $http, $state, Auction) {
  $scope.auction = {};

  $scope.createAuction = function () {
    Auction.createAuction($scope.auction).then(function (data) {
      $('.modal').modal('hide'); //  hide bootstrap modal (the gray background)
      $state.go('auction'); // change state to auctions/id
    });
  }
});
