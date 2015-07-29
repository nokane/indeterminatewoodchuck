var employeeDataController = require('../controllers/employeeDataController.js');

module.exports = function(app){ // app is employeeDataRouter injected from middleware.js
  app.post('/user', employeeDataController.getEmployeeUserData);
  app.post('/session', employeeDataController.getEmployeeSessionData);

};
