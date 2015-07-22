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

  it('should get a cookie upon authentication and use it to request employeeData', function(done){
    request.agent(app)
      .post('/api/users/signin')
      .send({ email: 'governator@california.gov', password: 'terminator' })
      .end(function(err, res){
        var cookie = res.headers['set-cookie'];
        expect(cookie).to.exist;
        request(app)
          .post('/api/employeeData')
          .set('Cookie', cookie)
          .end(function(err, res){
            expect(res.body.web_name).to.equal('Skynet');
            expect(res.body.employeeId).to.equal(1);
            expect(res.body.employeeFirstName).to.equal('Arnold');
            expect(res.body.employeeLastName).to.equal('Schwarzennegger');
            expect(res.body.employeeTitle).to.equal('T-1000');
            expect(res.body.employeeEmail).to.equal('governator@california.gov');
            done();
          });
      });
  });

});
