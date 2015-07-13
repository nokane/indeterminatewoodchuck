var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var server = require('http').Server(app);
var io = requre('socket.io')(server);

// app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/../client/dist'));

var socketroute = require('socketroute.js');

io.on('connection', function(socket) {
  socketroute(io, socket);
});

module.exports = app;
