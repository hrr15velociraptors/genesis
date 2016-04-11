angular.module('genesis.chat', [])

.controller('ChatController', function ($scope) {

  $scope.exist = 'happy';
  $scope.broadcast = function (msg) {
    // Socket.socket
  };


})

.factory('Socket', function () {
  var socket = io();
  $('form').submit(function(){
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
  });
  socket.on('chat message', function(msg){
    console.log('tried');
    $('#messages').append($('<li>').text(msg));
  });

  // refactor into non JQuery
  // socket.broad

  return {
    emit: 'emit',
    listen: 'on'
  };
});
