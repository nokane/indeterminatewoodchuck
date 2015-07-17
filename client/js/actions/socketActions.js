var AppDispatcher = require('../dispatchers/appDispatcher');
var appConstants = require('../constants/appConstants');

var socket = io();

socket.on('staffRoom', function(data) {
  console.log('Staff connecting to room with name: ', data);
  AppDispatcher.dispatch({
    type: appConstants.JOIN_ROOM,
    data: data
  });
});

var socketActions = {
  staffReady: function() {
    socket.emit('staffReady');
  }
};

module.exports = socketActions;
