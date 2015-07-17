var AppDispatcher = require('../dispatcher/appDispatcher');
var appConstants = require('../constants/appConstants');

var appActions = {
  startSocketListener: function() {
    AppDispatcher.handleAction({
      actionType: appConstants.START_SOCKET_LISTENER
    });
  }
};

module.exports = appActions;
