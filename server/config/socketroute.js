var socket = module.exports = {};

socket.rooms = {};
socket.num = 0;
socket.customerQueue = {};
socket.staff = {};

socket.socketroute = function(io, user) {
  user.category = undefined;
  user.organizationName = undefined;
  user.on('staffReady', function(orgName) {
    user.category = "staff";
    socket.num += 1;
    user.organizationName = orgName;
    var roomname = "room_" + orgName + "_" + socket.num;
    socket.rooms[orgName] = socket.rooms[orgName] || []; 
    socket.rooms[orgName].push(roomname);

    socket.staff[orgName] = socket.staff[orgName] || {};
    socket.staff[orgName][user.id] = roomname;
    io.to(user.id).emit('staffRoom', roomname);
    if (socket.customerQueue[orgName] && socket.customerQueue[orgName].length > 0) {
      var customerId = socket.customerQueue[orgName].shift();
      io.to(customerId).emit('customerRoom', socket.rooms[orgName].shift());
    }
  });

  user.on('customerRequest', function() {
    user.category = "customer";
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
    } else if (user.category === "customer") {
      var customerIndex = socket.customerQueue.indexOf(user.id);
      if (customerIndex !== -1) {
        socket.customerQueue.splice(customerIndex, 1);
      }
    }
  });
};
