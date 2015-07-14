var socket = module.exports = {};

socket.rooms = [];
socket.num = 0;

socket.socketroute = function(io, user) {
  user.on('staffReady', function() {
    socket.num += 1;
    var roomname = "room" + socket.num;
    socket.rooms.push(roomname);
    io.to(user.id).emit('staffRoom', roomname);
  });
};
