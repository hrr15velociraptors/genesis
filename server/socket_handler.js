var app = require('./server');
var io = require('./index.js').io;

/*
  SOCKET ROUTING
*/

// var http = require('http').Server(app);

// // mount socket.io onto dedicated server
// var io = require('socket.io')(http);



// have server listen for socket connections at port 3000
// http.listen(3000, function(){
//   console.log('SOCKET server listening on port: 3000');
// });

module.exports = io;
