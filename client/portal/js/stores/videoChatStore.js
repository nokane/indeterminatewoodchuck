var AppDispatcher = require('../dispatchers/appDispatcher');
var appConstants = require('../constants/appConstants');
var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;

var CHANGE = 'CHANGE';

var _videoStreams = {
  local: null,
  remote: null
};

var setLocalStream = function(peer) {
  _videoStreams.local = peer;
};

var setRemoteStream = function(peer) {
  _videoStreams.remote = peer;
};

var videoChatStore = objectAssign({}, EventEmitter.prototype, {
  addChangeListener: function(cb){
    this.on(CHANGE, cb);
  },
  removeChangeListener: function(cb){
    this.removeListener(CHANGE, cb);
  },
  getLocalStream: function() {
    return _videoStreams.local;
  },
  getRemoteStream: function() {
    return _videoStreams.remote;
  }
});

videoChatStore.dispatchToken = AppDispatcher.register(function(payload) {
  if (payload.actionType === appConstants.START_LOCAL_CONN) {
    setLocalStream(payload.peer);
    videoChatStore.emit(CHANGE);
  } else if (payload.actionType === appConstants.START_REMOTE_CONN) {
    setRemoteStream(payload.peer);
    videoChatStore.emit(CHANGE);
  } else if (payload.actionType === appConstants.STOP_REMOTE_CONN) {
    setRemoteStream(null);
    videoChatStore.emit(CHANGE);
  } 

  return true;
});

module.exports = videoChatStore;
