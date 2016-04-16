angular.module('genesis.auth', [])

.controller('AuthController', function($scope, $location, $window, Auth, $rootScope) {
  $scope.user = {};

  $scope.signin = function () {
    Auth.signin($scope.user)
      .then(function (data) {
        console.log(data);
        $window.localStorage.setItem('com.genesis', JSON.stringify(data));
        $location.path('/auctions');
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  $scope.signup = function () {
    Auth.signup($scope.user)
      .then(function (data) {
        console.log('BOOOOOOO');
        $window.localStorage.setItem('com.genesis', JSON.stringify(data));
        $location.path('/auctions');
      })
      .catch(function (error) {
        console.error(error);
      });
  };
})
// .directive('compareTo', function() {
//   return {
//     require: "ngModel",
//     scope: {
//       otherModelValue: "=compareTo"
//     },
//     link: function(scope, element, attributes, ngModel) {
//
//       ngModel.$validators.compareTo = function(modelValue) {
//         return modelValue == scope.otherModelValue;
//       };
//
//       scope.$watch("otherModelValue", function() {
//         ngModel.$validate();
//       });
//     }
//   };
// })
.factory('Auth', function ($http, $location, $window) {
  // Don't touch this Auth service!!!
  // it is responsible for authenticating our user
  // by exchanging the user's username and password
  // for a JWT from the server
  // that JWT is then stored in localStorage as 'com.app'
  // after you signin/signup open devtools, click resources,
  // then localStorage and you'll see your token from the server
  var signin = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signin',
      data: user
    })
    .then(function (res) {
      return res.data;
    });
  };

  var signup = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signup',
      data: user
    })
    .then(function (res) {
      return res.data;
    });
  };

  var isAuth = function () {
    return !!$window.localStorage.getItem('com.genesis');
  };

  var signout = function () {
    $window.localStorage.removeItem('com.genesis');
    $location.path('/signin');
  };


  return {
    signin: signin,
    signup: signup,
    isAuth: isAuth,
    signout: signout
  };
});
