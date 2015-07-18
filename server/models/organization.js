'use strict';
module.exports = function(sequelize, DataTypes) {
  var Organization = sequelize.define('Organization', {
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zip: DataTypes.STRING,
    country: DataTypes.STRING,
    industry: DataTypes.STRING,
    password_hash: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Organization.hasMany(models.User);
        Organization.hasMany(models.Session);
      }
    }
  });
  return Organization;
};
