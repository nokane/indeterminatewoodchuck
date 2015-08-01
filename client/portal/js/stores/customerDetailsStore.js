var AppDispatcher = require('../dispatchers/appDispatcher');
var appConstants = require('../constants/appConstants');
var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;

var CHANGE = 'CHANGE';

var state = {
  customerName: null,
  customerEmail: null,
  customerQuestion: null
};


var setCustomerDetails = function(customerDetails) {
  _state = customerDetails;
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
  if (payload.actionType === appConstants.START_LOCAL_CONN) {
    setCustomerDetails(payload.customerDetails);
    customerDetailsStore.emit(CHANGE);
  }

  return true;
});

module.exports = customerDetailsStore;
