var AppDispatcher = require('../dispatchers/appDispatcher');
var appConstants = require('../constants/appConstants');
var icecommActions = require('./icecommActions');

var socket;

var socketActions = {
  socketConnect: function(orgName, staffId, email) {

    socket = io.connect(window.location.origin, {query: "orgName="+orgName+'&staffId='+staffId+'&email='+email});
    console.log("successfully connected to socket server");

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

  },
  staffReady: function(web_name) {
    socket.emit('staffReady', web_name);
  },
  disconnect: function() {
    socket.disconnect();
  }
};

module.exports = socketActions;
