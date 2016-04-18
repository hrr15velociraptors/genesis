angular.module('genesis.header', [])

.controller('HeaderController', function ($scope, Auth, $window) {
  $scope.signout = function() {
    Auth.signout()
  }
  var token = $window.localStorage.getItem('com.genesis');
  $scope.checkToken = function() {
    return token ? true : false;
  }
})
