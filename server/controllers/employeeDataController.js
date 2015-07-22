var db = require('../models/index.js');

module.exports = {
  getEmployeeData: function(req, res){
    db.Organization.findOne({ where: { id: req.decoded.OrganizationId } }).then(function(org){
      res.json({
        web_name: org.web_name,
        employeeId: req.decoded.id,
        employeeFirstName: req.decoded.first_name,
        employeeLastName: req.decoded.last_name,
        employeeTitle: req.decoded.title,
        employeeEmail: req.decoded.email
      });
    });
  }
};
