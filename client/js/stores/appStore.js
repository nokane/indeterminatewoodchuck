var AppDispatcher = require('../dispatchers/appDispatcher');
var appConstants = require('../constants/appConstants');
var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;

var ROOM_CHANGE = 'ROOM_CHANGE';

// var _connections = {
//   comm: new Icecomm('ZZ2RA1DsHd9xdCqdoeJ8Wwra5A5fUKipAVrvzX6vOGHlLiAdO', { debug: true })
// };

var _room = '';

var setRoom = function(room) {
  _room = room;
};

var appStore = objectAssign({}, EventEmitter.prototype, {
  addChangeListener: function(cb){
    this.on(ROOM_CHANGE, cb);
  },
  removeChangeListener: function(cb){
    this.removeListener(ROOM_CHANGE, cb);
  },
  getRoom: function() {
    return _room;
  }
});

AppDispatcher.register(function(payload) {
  var action = payload.action;
  if (action.actionType === appConstants.JOIN_ROOM) {
    setRoom(action.data);
    appStore.emit(ROOM_CHANGE);
  } else {
    return true;
  }
});

module.exports = appStore;
