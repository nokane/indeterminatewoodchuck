var AppDispatcher = require('../dispatchers/appDispatcher');
var appConstants = require('../constants/appConstants');
var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;

var CHANGE = 'CHANGE';

var _state = {
  name: '',
  email: '',
  question: ''
};


var setCustomerDetails = function(customerDetails) {
  _state = customerDetails;
};

var removeCustomerDetails = function() {
  _state = {
    name: '',
    email: '',
    question: ''
  };
};

var customerDetailsStore = objectAssign({}, EventEmitter.prototype, {
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

customerDetailsStore.dispatchToken = AppDispatcher.register(function(payload) {
  if (payload.actionType === appConstants.CUSTOMER_DETAILS) {
    setCustomerDetails(payload.data);
    customerDetailsStore.emit(CHANGE);
  } else if (payload.actionType === appConstants.STOP_REMOTE_CONN) {
    setCustomerDetails(payload.data);
    customerDetailsStore.emit(CHANGE);
  }

  return true;
});

module.exports = customerDetailsStore;
