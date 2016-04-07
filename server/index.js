// EXPRESS ROUTING
var app = require('./server');

// socket communication handling
var io = require('./socket_handler.js');

/*
  CLIENT ROUTING
*/
var port = process.env.PORT || 8080;

app.listen(port, function () {
  console.log('Server listening on port: ' + port);
});

// route any root GET to index.html
app.get('/', function(req, res){
  res.sendfile('index.html');
});
