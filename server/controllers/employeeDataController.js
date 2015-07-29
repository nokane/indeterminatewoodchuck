var db = require('../models/index.js');

module.exports = {
  getEmployeeUserData: function(req, res){
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
  },

  getEmployeeSessionData: function(req, res){
    db.Session.findAll({attributes: ['cust_name', 'cust_email', 'createdAt', 'UserId', sequelize.col('User.title')], where: { OrganizationId: req.decoded.OrganizationId }, 
      include: [ { model: db.Organization, attributes: ['name'] },
                 { model: db.User, attributes: ['first_name', 'last_name', 'email', 'title'] }
               ] }).then(function(sessions){
      console.log("SESSION");
      console.log(JSON.stringify(sessions));
      res.json({john: "whatever"});
    });
  }

};
