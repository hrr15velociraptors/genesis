// ROUTING
var app = require('./server');

// ENV variables
var port = process.env.PORT || 8080;
var publish_key = process.env.PUBNUB_PUBLISH_KEY;
var subscribe_key = process.env.PUBNUB_SUBSCRIBE_KEY;

//current chat list users
var users = [];

// route any root GET to index.html
app.get('/', function(req, res){
  res.sendfile('index.html');
});

// route for client videochat
app.get('/keys', function(req, res) {
  res.send([publish_key, subscribe_key]);
});

app.listen(port, function () {
  console.log('ROUTING server listening on port: ' + port);
});

exports = {
  port: port,
  publish_key: publish_key,
  subscribe_key: subscribe_key
};
