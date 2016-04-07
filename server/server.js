/*
  SERVER INITIALIZATION
*/

var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');

app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client'));

app.use(morgan('dev'));

app.post('/api/users/signin', function(req, res) {
  res.json({token: 'token'});
});

app.post('/api/users/signup', function(req, res) {
  res.json({token: 'token'});
});

app.get('/api/users/signedin', function(req, res) {
  res.json({token: 'token'});
});

// set up routes HERE

module.exports = app;
