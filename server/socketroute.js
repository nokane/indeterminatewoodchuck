var socket = module.exports = {};

socket.rooms = [];
socket.num = 0;
socket.customerNum = 0;
socket.customerQueue = [];

socket.socketroute = function(io, user) {
  user.on('staffReady', function() {
    socket.num += 1;
    var roomname = "room" + socket.num;
    socket.rooms.push(roomname);
    io.to(user.id).emit('staffRoom', roomname);
  });

  user.on('customerRequest', function() {
    var customerName = 'customer' + socket.customerNum;
    socket.customerNum += 1;
    socket.customerQueue.push(customerName);
    if (socket.rooms.length !== 0) {
      io.to(user.id).emit('customerRoom', socket.rooms.shift());
      socket.customerQueue.shift();
    }
  });
};
