require('dotenv').load();
var db = require('../../../server/models/index.js');
var expect = require('chai').expect;
var request = require('supertest');
var app = require('../../../index.js');

describe('Employee Data Controller', function(){

  beforeEach(function(done){
    db.sequelize.sync({force: true}).then(function(){
      var newOrg = db.Organization.build({
        name: 'Skynet',
        address: 'Cheyenne Mountain',
        city: 'El Paso',
        state: 'Colorodo',
        zip: '80926',
        country: 'USA',
        industry: 'Terminating John Connor',
        password_hash: 'T-1000'
      });
      newOrg.save().then(function(org){
        var newUser = db.User.build({
          first_name: 'Arnold',
          last_name: 'Schwarzennegger',
          OrganizationId: org.id,
          title: 'T-1000',
          email: 'governator@california.gov',
          password_hash: 'terminator'
        });
        newUser.save().then(function(user){
          done();
        });
      });
    });
  });

  it('should be able to get employee data when a user is logged in', function(done){
    // the respone should contain the stuff in that object
  });

});
