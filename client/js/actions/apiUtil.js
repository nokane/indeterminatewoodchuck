var appActions = require('./appActions');
var request = require('superagent');

var apiUtil = {
  getEmployeeData: function() {
    // Must fix these variables
    var path = '/api/getEmployeeData';
    var token = 'token';

    request
      .get(path)
      .set('x-access-token', token)
      .end(function(err, res) {
        if (err) {
          console.log('Error with getEmployeeData: ', err);
          return;
        }
        appActions.setEmployeeData(res);
      });
  }
};

module.exports = apiUtil;
