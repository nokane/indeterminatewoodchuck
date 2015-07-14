
var socket = module.exports = {};

socket.rooms = [];
socket.num = 0;

socket.socketroute = function(io, user) {
  user.on('staffReady', function() {
    var roomname = "room" + socket.num++;
    socket.rooms.push(roomname);
    io.emit('staffRoom', roomname);
  });
};
