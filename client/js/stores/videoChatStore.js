var AppDispatcher = require('../dispatchers/appDispatcher');
var appConstants = require('../constants/appConstants');
var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;

var CHANGE = 'CHANGE';

var _videoStreams = {
  local: {},
  remote: {}
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
  var action = payload.action;
  if (action.actionType === appConstants.START_LOCAL_VIDEO_STREAM) {
    setLocalStream(action.peer);
    videoChatStore.emit(CHANGE);
  } else if (action.actionType === appConstants.START_REMOTE_VIDEO_STREAM) {
    setRemoteStream(action.peer);
    videoChatStore.emit(CHANGE);
  }

  return true;
});

module.exports = videoChatStore;
