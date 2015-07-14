var express = require('express');
var bodyParser = require('body-parser');

var app = express();

var server = require('http').Server(app);
var io = require('socket.io')(server);

// app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/../client/dist'));
app.use('/library', express.static(__dirname + '/../library'));

server.socketroute = require('./socketroute.js');

io.on('connection', function(socket) {
  server.socketroute.socketroute(io, socket);
});

module.exports = server;
