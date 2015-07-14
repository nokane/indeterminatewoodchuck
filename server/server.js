var express = require('express');
var bodyParser = require('body-parser');

var app = express();

var server = require('http').Server(app);
server.listen(3000);
var io = require('socket.io')(server);

// app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/../client/dist'));

app.socketroute = require('./socketroute.js');

io.on('connection', function(socket) {
  app.socketroute.socketroute(io, socket);
});

module.exports = app;
