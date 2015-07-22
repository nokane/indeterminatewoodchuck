var request = require('superagent');

var apiUtil = {
  getEmployeeData: function() {
    var path = '/api/employeeData';

    return request
      .post(path);
  }
};

module.exports = apiUtil;
