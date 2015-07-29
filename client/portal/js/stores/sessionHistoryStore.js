var AppDispatcher = require('../dispatchers/appDispatcher');
var appConstants = require('../constants/appConstants');
var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;

var CHANGE = 'CHANGE';

var _state = {
  sessions: [
    { time: '2:00 PM', employeeName: 'Batman', roomName: 'Arkham City', customerName: 'Naruto', email: 'naruto@sasuke.com', question: 'wahhhh??' },
    { time: '2:00 PM', employeeName: 'Superman', roomName: 'Metropolis', customerName: 'Naruto', email: 'naruto@sasuke.com', question: 'wahhhh??' },
    { time: '2:00 PM', employeeName: 'Iron Man', roomName: 'Somewhere Cool', customerName: 'Naruto', email: 'naruto@sasuke.com', question: 'wahhhh??' }
  ]
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
//   if (payload.actionType === appConstants.QUEUE_STATUS) {
//     setQueue(payload.data);
//     queueStore.emit(CHANGE);
//   } else if( payload.actionType === appConstants.CONNECT_STATUS ){
//     setConnect(payload.connected);
//     queueStore.emit(CHANGE);
//   }

  return true;
});

module.exports = sessionHistoryStore;
