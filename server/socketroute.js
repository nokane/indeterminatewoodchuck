var socket = module.exports = {};

socket.rooms = [];
socket.num = 0;
socket.customerQueue = [];
socket.staff = {};

socket.socketroute = function(io, user) {
  user.category = undefined;
  user.on('staffReady', function() {
    user.category = "staff";
    socket.num += 1;
    var roomname = "room" + socket.num;
    socket.rooms.push(roomname);
    socket.staff[user.id] = roomname;
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

  user.on('disconnect', function() {
    if (user.category === "staff") {
      var roomIndex = socket.rooms.indexOf(socket.staff[user.id])
      if (roomIndex != -1) {
        socket.rooms.splice(roomIndex, 1);
      }
    } 
  });
};
