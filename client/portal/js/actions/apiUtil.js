var request = require('superagent');

var apiUtil = {
  getEmployeeData: function() {
    var path = '/api/employeeData';

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
