var socket = module.exports = {};

socket.rooms = [];
socket.num = 0;
socket.customerQueue = [];

socket.socketroute = function(io, user) {
  user.on('staffReady', function() {
    socket.num += 1;
    var roomname = "room" + socket.num;
    socket.rooms.push(roomname);
    io.to(user.id).emit('staffRoom', roomname);
    if (socket.customerQueue.length > 0) {
      var customerId = socket.customerQueue.shift();
      io.to(customerId).emit('customerRoom', socket.rooms.shift());
    }
  });

  user.on('customerRequest', function() {
    socket.customerQueue.push(user.id);
    if (socket.rooms.length > 0) {
      io.to(user.id).emit('customerRoom', socket.rooms.shift());
      socket.customerQueue.shift();
    }
  });
};
