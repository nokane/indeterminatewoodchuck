var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

require('./config/middleware.js')(app, express, server, io);

module.exports = server;
