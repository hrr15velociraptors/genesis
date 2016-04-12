angular.module('genesis.chat', [])

.controller('ChatController', function ($scope, Socket, $rootScope) {

  //connect to sockets when landing on page
  Socket.connect();

  //disconnect when leaving page
  $scope.$on('$locationChangeStart', function(event) {
    // we need to remove user from users array on backend
    Socket.disconnect(true);
  });

  // pull user from root scope
  var user = $rootScope.user.username;

  if (user) {
    Socket.emit('user joined', {username: user});
  }

  // temporary storage of messages and users
  $scope.messages = [];
  $scope.users = [];

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

