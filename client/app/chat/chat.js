angular.module('genesis.chat', [])

.controller('ChatController', function ($scope, Socket) {

  //connect to sockets when landing on page
  Socket.connect();

  //disconnect when leaving page
  $scope.$on('$locationChangeStart', function(event) {
    Socket.disconnect(true);
  });

  //stores messages
  $scope.incomingMessage = [];

  //function to emit message to everyone in chat room
  $scope.broadcast = function (msg) {
    Socket.emit('message sent', msg);
    $scope.msg = '';
  };

  //listener for messages
  Socket.on('message sent', function(msg) {
    $scope.incomingMessage.push(msg);
  });
})
.factory('Socket', function (socketFactory) {
  return socketFactory();
});

