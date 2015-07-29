var request = require('superagent');

var apiUtil = {
  getEmployeeUserData: function() {
    var path = '/api/employeeData/user';

    return request
      .post(path);
  },

  getEmployeeSessionData: function() {
    var path = '/api/employeeData/session';

    return request
      .post(path);
  },

  logout: function(){
    var path = '/api/users/logout';

    return request
      .post(path);
  },

  getLogs: function(){
    // TODO: make a post request after john is done with his api
  }
};

module.exports = apiUtil;
