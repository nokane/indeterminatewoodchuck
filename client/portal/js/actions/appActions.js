var AppDispatcher = require('../dispatchers/appDispatcher');
var appConstants = require('../constants/appConstants');
var apiUtil = require('./apiUtil');

var appActions = {
  getEmployeeData: function() {
    apiUtil.getEmployeeData();
  }
};

module.exports = appActions;
