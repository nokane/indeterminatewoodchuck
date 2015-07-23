var db = require('../models/index.js');
var jwt = require('jsonwebtoken');
var helpers = require('../config/helpers.js');

module.exports = {
  signin: function(req, res){
    db.User.findOne({ where: { email: req.body.email } }).then(function(user){
      if( !user ){
        res.json({ success: "false", message: 'Invalid username.' });
      } else {
        user.checkPassword(req.body.password, function(valid){
          if( valid ){
            helpers.createToken(user, res);
          } else {
            res.json({ success: "false", message: 'Invalid password.' });
          }
        });
      }
    });
  },

  signup: function(req, res){
    db.Organization.findOne({ where: { name: req.body.businessName } }).then(function(org){
      if( !org ){ res.json({ success: "false", message: 'Organization does not exist.' }); }
      else {
        org.checkPassword(req.body.businessPassword, function(valid){
          if( !valid ){ res.json({ success: "false", message: 'Wrong organization password.' }); }
          else {
            db.User.findOne({ where: { email: req.body.email } }).then(function(user){
              if( user ){ res.json({ success: "false", message: 'User already exists.' }); }
              else {
                var orgUser = db.User.build({
                  first_name: req.body.firstName,
                  last_name: req.body.lastName,
                  OrganizationId: org.id,
                  title: req.body.jobTitle,
                  email: req.body.email,
                  password_hash: req.body.password
                });
                orgUser.save().then(function(newUser){
                  helpers.createToken(newUser, res);
                });
              }
            });
          }
        });
      }
    });
  },

  signupwithorg: function(req, res){
    db.Organization.findOne({ where: { name: req.body.businessName } }).then(function(org){
      if( org ){ res.json({ success: "false", message: 'Organization already exists.' }); }
      else {
        db.User.findOne({ where: { email: req.body.email } }).then(function(user){
          if( user ){ res.json({ success: "false", message: 'User already exists.' }); }
          else {
            var orgBuild = db.Organization.build({
              name: req.body.businessName,
              address: req.body.address,
              city: req.body.city,
              state: req.body.state,
              zip: req.body.zip,
              country: req.body.country,
              industry: req.body.industry,
              password_hash: req.body.businessPassword
            });
            orgBuild.save().then(function(newOrg){
              var userBuild = db.User.build({
                first_name: req.body.firstName,
                last_name: req.body.lastName,
                OrganizationId: newOrg.id,
                title: req.body.jobTitle,
                email: req.body.email,
                password_hash: req.body.password
              });
              userBuild.save().then(function(newUser){
                helpers.createToken(newUser, res);
              });
            });
          }
        });
      }
    });
  },

  logout: function(req, res){
    res.clearCookie('accessToken');
    res.end();
  }
};
