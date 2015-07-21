var socket = module.exports = {};

socket.rooms = {};
/*
  socket.rooms stores the names of rooms of staff who are available to help customers,
  for each individual Organization.

  key: the Organization name (same name as Organization model's "web_name" parameter)

  value: an array of names of all open rooms available for customers to join.
*/

socket.num = 0;
/*
  socket.num is used to generate unique room names
*/

socket.customerQueue = {};
/*
  socket.customerQueue stores the user Socket Id of each customer who is waiting to be
  helped by a staff member, for each individual Organization.

  key: the Organization name (same name as Organization model's "web_name" parameter)

  value: an array of user Socket Ids of those customers who are waiting to be helped by
  staff members.
*/

socket.staff = {};
/*
  socket.staff stores all staff who are currently logged in to the application, for
  each individual Organization

  key: the Organization name (same name as Organization model's "web_name" parameter)

  value: an object with the following key-value pair:
      key: the user Socket Id of the staff member
      value: the name of the room that the staff member is currently in
*/

socket.socketroute = function(io, user) {

  /*
    queueStatus() is used to notify the staff of a specific Organization when there
    is a change to the queue of Customers looking for help
  */
  var queueStatus = function(orgName) {
    for (var staffId in socket.staff[orgName]) {
      io.to(staffId).emit('queueStatus', socket.customerQueue[orgName]);
    }
  };

  user.category = undefined;
  /*
    user.category is used to distinguish whether the client side socket connection is
    of a customer or a staff
  */

  user.organizationName = undefined;
  /*
    user.organizationName keeps track of the Organization name pertaining to the client
    side socket connection
  */

  /*
    A staff member on the client side will emit the 'staffReady' event to the back-end
    to indicate that they are ready to help another customer. Upon receiving the
    'staffReady' event, the back-end will create a room name and send it to the staff member
    via the 'staffRoom' event. The room name will then be added to the
    socket.rooms[organizationName] array to indicate that the room is open for a customer
    to join.
  */
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

    /*
      Check to see if there are any customers waiting for help. If there are customers
      currently in the socket.customerQueue[organizationName], dequeue the customer who
      joined the customerQueue first, and send that customer the name of an available room.
      Remove the name of that available room from socket.rooms[organizationName]
    */
    if (socket.customerQueue[orgName] && socket.customerQueue[orgName].length > 0) {
      var customerId = socket.customerQueue[orgName].shift();
      io.to(customerId).emit('customerRoom', socket.rooms[orgName].shift());
    }
    queueStatus(orgName);
  });

  user.on('customerRequest', function(orgName) {
    user.category = "customer";
    user.organizationName = orgName;
    socket.customerQueue[orgName] = socket.customerQueue[orgName] || []; 
    socket.customerQueue[orgName].push(user.id);
    if (socket.rooms[orgName] && socket.rooms[orgName].length > 0) {
      io.to(user.id).emit('customerRoom', socket.rooms[orgName].shift());
      socket.customerQueue[orgName].shift();
    }
    queueStatus(orgName);
  });

  user.on('disconnect', function() {
    if (user.category === "staff") {
      var roomIndex = socket.rooms[user.organizationName].indexOf(socket.staff[user.organizationName][user.id]);
      if (roomIndex != -1) {
        socket.rooms[user.organizationName].splice(roomIndex, 1);
      }
      delete socket.staff[user.organizationName][user.id];

    } else if (user.category === "customer") {
      var customerIndex = socket.customerQueue[user.organizationName].indexOf(user.id);
      if (customerIndex !== -1) {
        socket.customerQueue[user.organizationName].splice(customerIndex, 1);
        queueStatus(user.organizationName);
      }
    }
  });
};
