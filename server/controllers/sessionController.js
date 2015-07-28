var db = require('../models/index.js');

module.exports = {
  addSession = function(staffId, roomname) {
    db.User.findOne({id: Number(staffId)}).then(function(user) {
      db.Session.build({
        UserId: user.id,
        OrganizationId: user.OrganizationId,
        room_name: roomname
      }).
      db.Session.save().then(function(session) {
        console.log("SESSION successfully created!");
        console.log(session);
      })
    })
  }
};
