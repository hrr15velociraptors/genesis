angular.module('genesis', [
  // 'genesis.auction',
  'genesis.profile',
  'genesis.auth',
  'genesis.chat',
  'genesis.services',
  'genesis.video',
  'ui.router',
  'btford.socket-io'
])
.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
  $urlRouterProvider.otherwise('/signin');

  $stateProvider
  .state('auction', {
      authenticate: true,
      url: '/auction',
      views: {
        '' : {
          templateUrl: 'app/auction/auction.html'
        },
        'chat@auction': {
          templateUrl: 'app/auction/chat/chat.html',
          controller: 'ChatController'
        },
        'video@auction': {
          templateUrl: 'app/auction/video/video.html',
          controller: 'VideoController'
        }
      }
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
  .state('profile', {
          authenticate: true,
          url: '/profile',
          templateUrl: 'app/profile/profile.html',
          controller: 'ProfileController'
    })

  $httpProvider.interceptors.push('AttachTokens');0
})
.factory('AttachTokens', function ($window) {
  // this is an $httpInterceptor
  // its job is to stop all out going request
  // then look in local storage and find the user's token
  // then add it to the header so the server can validate the request
  var attach = {
    request: function (object) {
      var jwt = $window.localStorage.getItem('com.genesis');
      if (jwt) {
        jwt = JSON.parse(jwt);
        object.headers['x-access-token'] = jwt.token;
      }
      object.headers['Allow-Control-Allow-Origin'] = '*';
      return object;
    }
  };
  return attach;
})
.run(function ($rootScope, $state, Auth) {
  $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams){
   if (toState.authenticate && !Auth.isAuth()) {
     $state.transitionTo("signin");
     event.preventDefault();
   }
 });
});
