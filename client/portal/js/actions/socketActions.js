var AppDispatcher = require('../dispatchers/appDispatcher');
var appConstants = require('../constants/appConstants');
var icecommActions = require('./icecommActions');

var socket = io();

socket.on('staffRoom', function(data) {
  console.log('Received socket response with roomname: ', data);
  AppDispatcher.dispatch({
    actionType: appConstants.JOIN_ROOM,
    data: data
  });
  icecommActions.setIcecommRoom(data);
});

var socketActions = {
  staffReady: function() {
    // add business name as second argument
    socket.emit('staffReady');
  }
};

module.exports = socketActions;
