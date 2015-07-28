var AppDispatcher = require('../dispatchers/appDispatcher');
var appConstants = require('../constants/appConstants');
var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;

var CHANGE = 'CHANGE';

var _state = {
  messages: [],
  connected: false
};

var addMessage = function(user, message) {
  _state.messages.push([ user, message ]);
};

var clearMessages = function() {
  _state.messages = [];
};

var setConnect = function(status){
  console.log('button status now changing to: ', status);
  _state.connected = status;
};

var textChatStore = objectAssign({}, EventEmitter.prototype, {
  addChangeListener: function(cb){
    this.on(CHANGE, cb);
  },
  removeChangeListener: function(cb){
    this.removeListener(CHANGE, cb);
  },
  getState: function() {
    return _state;
  }
});

textChatStore.dispatchToken = AppDispatcher.register(function(payload) {
  if (payload.actionType === appConstants.SEND_TEXT_MESSAGE) {
    addMessage(payload.user, payload.message);
    textChatStore.emit(CHANGE);
  } else if (payload.actionType === appConstants.CLEAR_MESSAGES) {
    clearMessages();
    textChatStore.emit(CHANGE);
  } else if( payload.actionType === appConstants.CONNECT_STATUS ){
    console.log('do we even get to the button reset value');
    setConnect(payload.connected);
    textChatStore.emit(CHANGE);
  }

  return true;
});

module.exports = textChatStore;
