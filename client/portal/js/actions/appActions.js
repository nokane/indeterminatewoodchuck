var AppDispatcher = require('../dispatchers/appDispatcher');
var appConstants = require('../constants/appConstants');
var socketActions = require('./socketActions.js');
var apiUtil = require('./apiUtil');

var setEmployeeData = function(data) {
  AppDispatcher.dispatch({
    actionType: appConstants.SET_EMPLOYEE_DATA,
    employeeData: data
  });
};

var appActions = {
  getEmployeeUserData: function() {
    apiUtil.getEmployeeUserData()
      .end(function(err, res) {
        if (err) {
          console.log('Error with getEmployeeData: ', err);
          return;
        }
        setEmployeeData(res.body);
        socketActions.socketConnect(res.body.web_name, res.body.employeeId, res.body.employeeEmail);
      });
  },

  getEmployeeSessionData: function() {
    apiUtil.getEmployeeSessionData()
      .end(function(err, res) {
        if (err) {
          console.log('Error with getEmployeeSessionData: ', err);
          return;
        }
      });
  },

  employeeSignOut: function(){
    // delete cookie
    // go to apiUtils and issue a get request to '/login'
    apiUtil.logout()
      .end(function(err, res){
        if( err ){
          console.log('There was a problem logging out: ', err);
          return;
        }
        socketActions.disconnect();
        window.location.href = window.location.origin + '/login';
      });
  },

  clearMessages: function(){
    AppDispatcher.dispatch({
      actionType: appConstants.CLEAR_MESSAGES
    });
  }
};


module.exports = appActions;
