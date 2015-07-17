var AppDispatcher = require('../dispatchers/appDispatcher');
var appConstants = require('../constants/appConstants');

var comm = new Icecomm('ZZ2RA1DsHd9xdCqdoeJ8Wwra5A5fUKipAVrvzX6vOGHlLiAdO', { debug: true })

comm.on('staffRoom', function(data) {
  // console.log('Staff connecting to room with name: ', data);
  // AppDispatcher.dispatch({
  //   type: appConstants.JOIN_ROOM,
  //   data: data
  // });
});

var icecommActions = {
  // staffReady: function() {
  //   socket.emit('staffReady');
  // }
};

module.exports = icecommActions;
