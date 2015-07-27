var AppDispatcher = require('../dispatchers/appDispatcher');
var appConstants = require('../constants/appConstants');
var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;

var CHANGE = 'CHANGE';

var _state = {
  connected: false,
  customerQueue: []
};

var setQueue = function(customerQueue) {
  _state.customerQueue = customerQueue;
};

var setConnect = function(){
  _state.connected = !_state.connected;
};

var queueStore = objectAssign({}, EventEmitter.prototype, {
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

queueStore.dispatchToken = AppDispatcher.register(function(payload) {
  if (payload.actionType === appConstants.QUEUE_STATUS) {
    setQueue(payload.data);
    queueStore.emit(CHANGE);
  } else if( payload.actionType === appConstants.CONNECT_STATUS ){
    setConnect();
    queueStore.emit(CHANGE);
  }

  return true;
});

module.exports = queueStore;
