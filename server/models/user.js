'use strict';
var bcrypt = require('bcrypt-nodejs');

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
    },
    instanceMethods: {
      hashPassword: function(password, cb) {
        var user = this;
        return bcrypt.genSalt(10, function(err, salt) {
          if (err) {
            return cb(err);
          }
          return bcrypt.hash(password, salt, null, function(error, hash) {
            if (err) {
              return cb(err);
            }
            user.password_hash = hash;
            return cb();
          });
        });
      },
      checkPassword: function(password, cb) {
        var user = this;
        return bcrypt.compare(password, this.password_hash, function(err, result) {
          if(err){
            return cb(err);
          }
          return cb(result);
        });
      }
    }
  });
  return User;
};
