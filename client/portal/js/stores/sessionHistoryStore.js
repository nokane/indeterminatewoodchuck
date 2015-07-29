var AppDispatcher = require('../dispatchers/appDispatcher');
var appConstants = require('../constants/appConstants');
var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;

var CHANGE = 'CHANGE';

var _state = {
  sessions: []
};

var setSessions = function(logHistory) {
  _state.sessions = logHistory;
};

var sessionHistoryStore = objectAssign({}, EventEmitter.prototype, {
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

sessionHistoryStore.dispatchToken = AppDispatcher.register(function(payload) {
  if( payload.actionType === appConstants.SESSION_DATA ){
    setSessions(payload.data);
    sessionHistoryStore.emit(CHANGE);
  }

  return true;
});

module.exports = sessionHistoryStore;
