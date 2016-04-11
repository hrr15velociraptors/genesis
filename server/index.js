// EXPRESS ROUTING
var app = require('./server');

/*
  CLIENT ROUTING
*/
var port = process.env.PORT || 8080;

// mount socket.io onto dedicated server
// socket communication handling
var http = require('http').Server(app);
var io = require('socket.io')(http);

// route any root GET to index.html
app.get('/', function(req, res){
  res.sendfile('index.html');
});

// socket event handling
io.on('connection', function(socket){
  console.log('socket has made contact');
  socket.on('disconnect', function() {
    console.log('a socket has been destroyed');
  });
});

// register socket event with 'chat message' from client
io.on('connection', function(socket){
  socket.on('message sent', function(msg){
    // broadcast incoming message to all clients
    io.emit('message sent', msg);
    console.log('message: ' + msg);
  });
});

http.listen(port, function () {
  console.log('ROUTING server listening on port: ' + port);
});
