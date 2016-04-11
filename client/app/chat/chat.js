angular.module('genesis.chat', [])

.controller('ChatController', function ($scope, Socket) {

  Socket.connect();

  $scope.$on('$locationChangeStart', function(event) {
    Socket.disconnect(true);
  })

  // Socket.on('chat message', function () {
  //   console.log('i received a message');
  // });

  $scope.exist = 'happy';
  // $scope.broadcast = function (msg) {
  //   Socket.socket
  // };


})
.factory('Socket', function (socketFactory) {
  return socketFactory();
});



//   var socket = io();
//   $('form').submit(function(){
//     socket.emit('chat message', $('#m').val());
//     $('#m').val('');
//     return false;
//   });
//   socket.on('chat message', function(msg){
//     console.log('tried');
//     $('#messages').append($('<li>').text(msg));
//   });

//   // refactor into non JQuery
//   // socket.broad

//   return {
//     emit: 'emit',
//     listen: 'on'
//   };
// });
