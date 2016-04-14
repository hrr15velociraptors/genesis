angular.module('genesis.profile',  [])
.controller('ProfileController', function ($scope, User) {
  $scope.user = {};

  User.getUserData().then(function (userData) {
    $scope.user = userData;
  });
})
.controller('CreateAucController', function($scope, $http) {
  $scope.auction = {};

  $scope.createAuction = function () {
      return $http({
        method: 'POST',
        url: '/api/users/auctions',
        data: $scope.auction
      })
      .then(function (res) {
        console.log('Auction saved in DB');
      });
    };
});
