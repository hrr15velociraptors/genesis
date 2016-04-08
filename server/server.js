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

var initPassport = require('./passport/init');
var signupPassport = require('./passport/signup');
initPassport(passport);
signupPassport(passport);

// app.post('/api/users/signin', function(req, res) {
//   res.json({token: 'token'});
// });
//
app.post('/api/users/signup', passport.authenticate('signup', {
		successRedirect: '/',
		failureRedirect: '/signup'
}));
// app.get('/api/users/signedin', function(req, res) {
//   res.json({token: 'token'});
// });

// set up routes HERE
module.exports = app;
