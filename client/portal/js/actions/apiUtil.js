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
  }
};

module.exports = apiUtil;
