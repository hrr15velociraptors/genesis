angular.module('genesis.profile',  [])
.controller('ProfileController', function ($scope, $rootScope, User) {
  $scope.user = {};
  User.getUserData().then(function (userData) {
    $scope.user = userData;
  });
})
