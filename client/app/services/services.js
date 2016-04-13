angular.module('genesis.services', [])
.factory('User', function ($http, $window) {

  var username = $window.localStorage.getItem('com.genesis').username;
  var getUserData = function () {
    return $http({
      method: 'GET',
      url: '/api/users',
      data: {
        username: username
      }
    }).then(function (res) {
      return res.data;
    })
  };

  return {
    getUserData: getUserData
  };

})
.factory('Socket', function (socketFactory) {
  return socketFactory();
});
