var AppDispatcher = require('../dispatchers/appDispatcher');
var appConstants = require('../constants/appConstants');
var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;

var ROOM_CHANGE = 'ROOM_CHANGE';

var _room = '';

var setRoom = function(room) {
  _room = room;
};

var appStore = objectAssign({}, EventEmitter.prototype, {
  addRoomChangeListener: function(cb){
    this.on(ROOM_CHANGE, cb);
  },
  removeRoomChangeListener: function(cb){
    this.removeListener(ROOM_CHANGE, cb);
  },
  getRoom: function() {
    return _room;
  }
});

appStore.dispatchToken = AppDispatcher.register(function(payload) {
  if (payload.actionType === appConstants.JOIN_ROOM) {
    setRoom(payload.data);
    appStore.emit(ROOM_CHANGE);
  }

  return true;
});

module.exports = appStore;
