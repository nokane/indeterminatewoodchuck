var AppDispatcher = require('../dispatchers/appDispatcher');
var appConstants = require('../constants/appConstants');
var apiUtil = require('./apiUtil');

var appActions = {
  getEmployeeData: function() {
    apiUtil.getEmployeeData();
  },

  setEmployeeData: function(data) {
    AppDispatcher.dispatch({
      actionType: appConstants.SET_EMPLOYEE_DATA,
      employeeData: data
    });
  }
};

module.exports = appActions;
