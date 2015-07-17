var AppDispatcher = require('../dispatchers/appDispatcher');
var appConstants = require('../constants/appConstants');

var comm = new Icecomm('ZZ2RA1DsHd9xdCqdoeJ8Wwra5A5fUKipAVrvzX6vOGHlLiAdO', { debug: true })

comm.on('local', function(peer) {
  AppDispatcher.dispatch({
    type: appConstants.START_LOCAL_STREAM,
    peer: peer
  });
});

comm.on('connected', function(peer) {
  
  document.getElementById('customerVideo').appendChild(peer.getVideo());
});

comm.on('disconnect', function(peer) {
  document.getElementById(peer.ID).remove();
});

var icecommActions = {
  setIcecommRoom: function(data) {
    console.log('Icecomm about to connect to roomname: ', data);
    comm.connect(data, {audio: true, limit: 2});
  }
};

module.exports = icecommActions;
