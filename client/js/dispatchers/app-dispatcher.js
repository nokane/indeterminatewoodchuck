var Dispatcher = require('flux').Dispatcher;
var AppDispatcher = new Dispatcher();

AppDispatcher.handleAction = function(action) {
  this.dispatch({
    // Not sure if source is needed?
    source: 'VIEW_ACTION',
    action: action
  });
};

module.exports = AppDispatcher;
