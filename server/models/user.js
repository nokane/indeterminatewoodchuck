'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    title: DataTypes.STRING,
    email: DataTypes.STRING,
    password_hash: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        User.belongsTo(models.Organization);
        User.hasMany(models.Session);
      }
    }
  });
  return User;
};
