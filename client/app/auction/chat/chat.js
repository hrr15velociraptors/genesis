angular.module('genesis.chat', [])

.controller('ChatController', function ($scope, Socket, $rootScope, Auth) {

  //connect to sockets when landing on page
  Socket.connect();

  //disconnect when leaving page
  $scope.$on('$locationChangeStart', function(event) {
    // we need to remove user from users array on backend
    Socket.disconnect(true);
  });
  // for logging out and deleting local client user token/session
  $scope.signout = function() {
    //Give message to user for succesfull sign out
    console.log('You have succesfully signed out');
    Auth.signout();
  };

  // pull user from root scope
  var user = $scope.user.username;

  if (user) {
    Socket.emit('user joined', {username: user});
  }

  Socket.on('add-user', function (data) {
    $scope.users.push(data.username);
    $scope.messages.push({username: data.username, message: 'has entered the channel'});
  });

  //function to emit message to everyone in chat room
  $scope.broadcast = function (msg) {
    Socket.emit('message sent', {username: user, message: msg});
    $scope.msg = '';
  };

  //listener for messages
  Socket.on('message sent', function(message) {
    $scope.messages.push(message);
  });
})
.factory('Socket', function (socketFactory) {
  return socketFactory();
});
