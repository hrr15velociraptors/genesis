/*
  SERVER INITIALIZATION
*/
var passport = require('passport');
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var expressSession = require('express-session');
var User = require('./../db/models').User;

app = express();
app.use(expressSession({secret: 'vodka'}));
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client'));

app.use(morgan('dev'));

require('./passport/init')(passport);
require('./passport/signup')(passport);

// rout set up
require('./routes')(app, passport);

module.exports = app;
