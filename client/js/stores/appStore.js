var AppDispatcher = require('../dispatcher/appDispatcher');
var appConstants = require('../constants/appConstants');
var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

var _connections = {
  // should we require socket and icecomm with Browserify?
  socket: io(),
  comm: new Icecomm('ZZ2RA1DsHd9xdCqdoeJ8Wwra5A5fUKipAVrvzX6vOGHlLiAdO', { debug: true })
};

var _room = '';

var setUpEventListeners = function(){
  _connections.socket.on('staffRoom', function(msg) {
    console.log('Staff connected to room with name: ', msg);
    _room = msg;
  });
};

var appStore = objectAssign({}, EventEmitter.prototype, {
  getRoom: function() {
    return _room;
  }
});

AppDispatcher.register(function(payload) {

});

module.exports = appStore;
