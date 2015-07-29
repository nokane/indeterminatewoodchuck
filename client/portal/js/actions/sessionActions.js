var AppDispatcher = require('../dispatchers/appDispatcher');
var appConstants = require('../constants/appConstants');
var apiUtil = require('./apiUtil');

var sessionActions = {
  getEmployeeSessionData: function() {
    apiUtil.getEmployeeSessionData()
      .end(function(err, res) {
        if (err) {
          console.log('Error with getEmployeeSessionData: ', err);
          return;
        }
        AppDispatcher.dispatch({
          actionType: appConstants.SESSION_DATA,
          employeeData: res.body
        });
      });
  }
};

module.exports = sessionActions;
