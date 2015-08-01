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
    db.Session.findAll({attributes: ['cust_name', 'cust_email', 'createdAt', 'question', 'UserId'], where: { OrganizationId: req.decoded.OrganizationId },
      include: [ { model: db.Organization, attributes: ['name'] },
                 { model: db.User, attributes: ['first_name', 'last_name', 'email', 'title'] }
               ],
      order: '"createdAt" DESC' }).then(function(sessions){

      var flattenObject = function(ob) {
        var toReturn = {};
        for (var i in ob) {
          if (!ob.hasOwnProperty(i)) continue;
          if ((typeof ob[i]) == 'object') {
            var flatObject = flattenObject(ob[i]);
            for (var x in flatObject) {
              if (!flatObject.hasOwnProperty(x)) continue;
                toReturn[x] = flatObject[x];
            }
          } else {
            toReturn[i] = ob[i];
          }
        }
        return toReturn;
      };

      var data = (JSON.parse(JSON.stringify(sessions)));
      var resData = [];
      var newRecord;
      for (var i = 0; i < data.length; i++) {
        newRecord = flattenObject(data[i]);
        resData.push(newRecord);
      }
      res.json(resData);
    });
  }

};
