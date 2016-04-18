angular.module('genesis.auth', [])

.controller('AuthController', function($scope, $location, $window, Auth, $rootScope) {
  $scope.user = {};
  $scope.password_c = '';
  $scope.signin = function () {
    Auth.signin($scope.user)
      .then(function (data) {
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
        $window.localStorage.setItem('com.genesis', JSON.stringify(data));
        $location.path('/auctions');
      })
      .catch(function (error) {
        console.error(error);
      });
  };


})
.directive('validPasswordC', function () {
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function (viewValue, $scope) {
                if (viewValue === scope.signUpForm.password.$viewValue) {
                  noMatch = true;
                } else {
                  noMatch = false;
                }
                ctrl.$setValidity('noMatch', noMatch);
                return noMatch ? noMatch : undefined;
            })
        }
    }
})
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
