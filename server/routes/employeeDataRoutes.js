var employeeDataController = require('../controllers/employeeDataController.js');

module.exports = function(app){ // app is employeeDataRouter injected from middleware.js
  app.post('/', employeeDataController.getEmployeeData);
};
