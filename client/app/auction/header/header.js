angular.module('genesis.header', [])

.controller('HeaderController', function ($scope, Auth) {
  $scope.signout = function() {
    Auth.signout()
  }
})
