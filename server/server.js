var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/../client/dist'));

module.exports = app;
