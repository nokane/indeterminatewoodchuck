'use strict';
module.exports = function(sequelize, DataTypes) {
  var Session = sequelize.define('Session', {
    room_name: DataTypes.STRING,
    cust_name: DataTypes.STRING,
    cust_email: DataTypes.STRING,
    question: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Session.belongsTo(models.Organization);
        Session.belongsTo(models.User);
      }
    }
  });
  return Session;
};
