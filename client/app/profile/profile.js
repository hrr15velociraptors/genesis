angular.module('genesis.profile',  [])
.controller('ProfileController', function ($scope, User) {
  $scope.user = {};
  User.getUserData().then(function (userData) {
    $scope.user = userData;
  });
})
