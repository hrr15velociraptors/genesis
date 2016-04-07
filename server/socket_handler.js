var app = require('./server');

/*
  SOCKET ROUTING
*/

// spin up a primitive http server on Express app
// low-level access to TCP sockets needed
var http = require('http').Server(app); 

// mount socket.io onto dedicated server
var io = require('socket.io')(http);

// socket event handling
io.on('connection', function(socket){
  console.log('socket has made contact');
  socket.on('disconnect', function() {
    console.log('a socket has been destroyed');
  });
});

// register socket event with 'chat message' from client
io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
  });
});

// have server listen for socket connections at port 3000
http.listen(3000, function(){
  console.log('listening on *:3000');
});

module.exports = io;