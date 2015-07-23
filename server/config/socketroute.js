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
    for (var k = 0; k < socket.customerQueue[orgName]; k++) {
      io.to(socket.customerQueue[orgName][k]).emit('customerQueueStatus', k);
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

    socket.staff[orgName] = socket.staff[orgName] || {};
    socket.rooms[orgName] = socket.rooms[orgName] || [];
    socket.customerQueue[orgName] = socket.customerQueue[orgName] || []; 

    /*
      Do not create a new room if the staff member emits a 'staffReady' event when they are
      already in a room and are available to help a customer
    */
    if (socket.staff[orgName][user.id]) {
      var currentRoom = socket.staff[orgName][user.id];
      if (socket.rooms[orgName].indexOf(currentRoom) !== -1) {
        return;
      }
    }

    user.category = "staff";
    socket.num += 1;
    user.organizationName = orgName;

    var roomname = "room_" + orgName + "_" + socket.num;
    socket.rooms[orgName].push(roomname);

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

  /*
    A customer on the client side will emit the 'customerRequest' event to the back-end
    to indicate that they would like to chat with a staff member. Upon receiving the
    'customerRequest' event, the back-end will add the customer's Socket Id to the
    socket.customerQueue[orgName] array.
  */
  user.on('customerRequest', function(orgName) {
    user.category = "customer";
    user.organizationName = orgName;
    socket.customerQueue[orgName] = socket.customerQueue[orgName] || []; 

    /*
      If the customer emits 'customerRequest' when they are already in the customerQueue,
      do nothing
    */
    if (socket.customerQueue[orgName].indexOf(user.id) !== -1) {
      return;
    }

    socket.customerQueue[orgName].push(user.id);

    /*
      Check if there are a room open with a staff member available to help the customer.
      If there is a staff member available, dequeue the room name of the room that was first
      added to socket.rooms[orgName].
    */
    if (socket.rooms[orgName] && socket.rooms[orgName].length > 0) {
      io.to(user.id).emit('customerRoom', socket.rooms[orgName].shift());
      socket.customerQueue[orgName].shift();
    }
    queueStatus(orgName);
  });

  /*
    When a customer or staff member has disconnected their socket connection
  */
  user.on('disconnect', function() {
    if (user.category === "staff") {
      /*
        For a staff member, check to see if that staff person is in a room and is not
        currently helping any customers (indicated by their room name being in
        socket.rooms[organizationName]). If the room name is in
        socket.rooms[organizationName], remove the room name from the array. Then remove the
        staff Socket Id from socket.staff[organizationName]
      */

      var roomIndex = socket.rooms[user.organizationName].indexOf(socket.staff[user.organizationName][user.id]);
      if (roomIndex != -1) {
        socket.rooms[user.organizationName].splice(roomIndex, 1);
      }
      delete socket.staff[user.organizationName][user.id];
    } else if (user.category === "customer") {
      /*
        For a customer, check to see if that customer's Socket Id is in
        socket.customerQueue[organizationName]. If it is, remove it
      */

      var customerIndex = socket.customerQueue[user.organizationName].indexOf(user.id);
      if (customerIndex !== -1) {
        socket.customerQueue[user.organizationName].splice(customerIndex, 1);
        queueStatus(user.organizationName);
      }
    }
  });
};
