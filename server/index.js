// ROUTING
var app = require('./server');
// ENV variables
var port = process.env.PORT || 8080;
var publish_key = process.env.PUBNUB_PUBLISH_KEY;
var subscribe_key = process.env.PUBNUB_SUBSCRIBE_KEY;

// route for client videochat
app.get('/keys', function(req, res) {
  res.send([publish_key, subscribe_key]);
});

var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection', function(socket){
  console.log('a user connected');
});

http.listen(port, function () {
  console.log('ROUTING server listening on port: ' + port);
});

module.exports = {
  io: io,
  port: port,
  publish_key: publish_key,
  subscribe_key: subscribe_key
};
