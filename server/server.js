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

// set up routes HERE

module.exports = app;
