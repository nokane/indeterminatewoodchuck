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

socket.on('queueStatus', function(data) {
  AppDispatcher.dispatch({
    actionType: appConstants.QUEUE_STATUS,
    data: data
  });
});

var socketActions = {
  staffReady: function(orgName) {
    socket.emit('staffReady', orgName);
  }
};

module.exports = socketActions;
