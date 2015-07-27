var AppDispatcher = require('../dispatchers/appDispatcher');
var appConstants = require('../constants/appConstants');

var comm = new Icecomm('ZZ2RA1DsHd9xdCqdoeJ8Wwra5A5fUKipAVrvzX6vOGHlLiAdO', { debug: true })

comm.on('local', function(peer) {
  AppDispatcher.dispatch({
    actionType: appConstants.START_LOCAL_CONN,
    peer: peer
  });
});

comm.on('connected', function(peer) {
  AppDispatcher.dispatch({
    actionType: appConstants.START_REMOTE_CONN,
    peer: peer
  });

  AppDispatcher.dispatch({
    actionType: appConstants.CONNECT_STATUS
  });
});

comm.on('disconnect', function(peer) {
  AppDispatcher.dispatch({
    actionType: appConstants.STOP_REMOTE_CONN,
    peer: peer
  });

  AppDispatcher.dispatch({
    actionType: appConstants.CONNECT_STATUS
  });
});

comm.on('data', function(message) {
  AppDispatcher.dispatch({
    actionType: appConstants.SEND_TEXT_MESSAGE,
    // Change to reflect customer name
    user: 'customer',
    message: message.data
  });
});

var icecommActions = {
  setIcecommRoom: function(data) {
    console.log('Icecomm about to connect to roomname: ', data);
    comm.connect(data, {audio: true, limit: 2});
  },

  sendTextMessage: function(message) {
    console.log('Icecomm is about to send message: ', message);
    comm.send(message);
    AppDispatcher.dispatch({
      actionType: appConstants.SEND_TEXT_MESSAGE,
      // Change to reflect staff name
      user: 'staff',
      message: message
    });
  },

  disconnect: function(){
    var leaveCode = 'chropdhopycdchardosdchroyp';
    comm.send(leaveCode);
  }
};

module.exports = icecommActions;
