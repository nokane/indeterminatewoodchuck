var AppDispatcher = require('../dispatchers/appDispatcher');
var appConstants = require('../constants/appConstants');
var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;

var CHANGE = 'CHANGE';

var _state = {
  customerQueue: []
};

var setQueue = function(customerQueue) {
  _state.customerQueue = customerQueue;
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
  }

  return true;
});

module.exports = queueStore;
