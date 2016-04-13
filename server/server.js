/*
  SERVER INITIALIZATION
*/
var passport = require('passport');
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');

app = express();
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client'));

app.use(morgan('dev'));

require('./passport/init')(passport);
require('./passport/signup')(passport);
require('./passport/signin')(passport);

// rout set up
require('./routes')(app, passport);

module.exports = app;
