var AppDispatcher = require('../dispatchers/appDispatcher');
var appConstants = require('../constants/appConstants');
var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

// var _connections = {
//   comm: new Icecomm('ZZ2RA1DsHd9xdCqdoeJ8Wwra5A5fUKipAVrvzX6vOGHlLiAdO', { debug: true })
// };

var _room = '';

var setRoom = function(room) {
  _room = room;
};

var appStore = objectAssign({}, EventEmitter.prototype, {
  getRoom: function() {
    return _room;
  }
});

AppDispatcher.register(function(payload) {
  var action = payload.action;
  if (action.actionType === appConstants.JOIN_ROOM) {
    setRoom(action.data);
    appStore.emit(CHANGE_EVENT);
  } else {
    return true;
  }
});

module.exports = appStore;
