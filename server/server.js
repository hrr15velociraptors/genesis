var express = require('express');
var bodyParser = require('body-parser');

app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client'));

// set up routes HERE

module.exports = app;
