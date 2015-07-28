var db = require('../models/index.js');

module.exports = {
  addSession: function(staffId, roomname, customerData) {
    db.User.findOne({where: {id: staffId}}).then(function(user) {
      var newSession = db.Session.build({
        UserId: user.id,
        OrganizationId: user.OrganizationId,
        room_name: roomname,
        cust_name: customerData.name,
        cust_email: customerData.email,
        question: customerData.question
      });
      newSession.save().then(function(session) {
        console.log("SESSION successfully created!");
        console.log(session);
      })
    })
  }
};
