angular.module('genesis', [
  // 'genesis.auction',
  'genesis.auth',
  'genesis.chat',
  // 'genesis.services',
  'ui.router',
  'btford.socket-io'
])
.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
  $urlRouterProvider.otherwise('/signin');

  $stateProvider
  .state('auction', {
      url: '/auction',
      templateUrl: 'app/chat/chat.html',
      controller: 'ChatController',
      authenticate: true
    })
  .state('signin', {
        url: '/signin',
        templateUrl: 'app/auth/signin.html',
        controller: 'AuthController'
    })
  .state('signup', {
          url: '/signup',
          templateUrl: 'app/auth/signup.html',
          controller: 'AuthController'
    })

  $httpProvider.interceptors.push('AttachTokens');
})
.factory('AttachTokens', function ($window) {
  // this is an $httpInterceptor
  // its job is to stop all out going request
  // then look in local storage and find the user's token
  // then add it to the header so the server can validate the request
  var attach = {
    request: function (object) {
      var jwt = $window.localStorage.getItem('genesis.app');
      if (jwt) {
        object.headers['x-access-token'] = jwt;
      }
      object.headers['Allow-Control-Allow-Origin'] = '*';
      return object;
    }
  };
  return attach;
})
.run(function ($rootScope, $state, Auth) {
  $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
   if (toState.authenticate && !Auth.isAuth()){

     $state.transitionTo("signin");
     event.preventDefault();
   }
 });
});
