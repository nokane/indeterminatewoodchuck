require("dotenv").load();
var expect = require("chai").expect;
var express = require("express");
var db = require("../../../server/models/index.js");

describe("User Model", function(){

  beforeEach(function(done){
    db.sequelize.sync({force: true}).then(function(){
      done();
    });
  });

  it("Create a new User and find that User with User.findOne()", function(done){
    var newOrg = db.Organization.build({name:"Dog Clothes",
                    address: "123 fake street",
                    city: "San Francisco",
                    state: "CA",
                    zip: "94122",
                    country: "USA",
                    industry: "apparel",
                    password_hash: "bla"});
    newOrg.save().then(function(x){
      var find = db.Organization.findOne({name:"Dog Clothes"})
      .then(function(org){
        expect(org.city).to.equal("San Francisco");
        expect(org.state).to.equal("CA");
        var user = db.User.build({first_name: "john",
                      last_name: "doe",
                      OrganizationId: org.id,
                      title: "boss",
                      email: "thefella@boss.com",
                      password_hash: "righton"});
        user.save().then(function() {
          db.User.findOne({id: 1}).then(function(foundUser) {
            expect(foundUser.first_name).to.equal("john");
            expect(foundUser.title).to.equal("boss")
            done();
          });
        });
      });
    });
  });

  it("Create two Users and find those Users with Organization.getUsers()", function(done){
    var newOrg = db.Organization.build({name:"Dog Clothes",
                    address: "123 fake street",
                    city: "San Francisco",
                    state: "CA",
                    zip: "94122",
                    country: "USA",
                    industry: "apparel",
                    password_hash: "bla"});
    newOrg.save().then(function(x){
      var find = db.Organization.findOne({name:"Dog Clothes"})
      .then(function(org){
        expect(org.city).to.equal("San Francisco");
        expect(org.state).to.equal("CA");
        var user = db.User.build({first_name: "john",
                      last_name: "doe",
                      OrganizationId: org.id,
                      title: "boss",
                      email: "thefella@boss.com",
                      password_hash: "righton"});
        user.save().then(function() {
          var secondUser = db.User.build({first_name: "mike",
                      last_name: "lee",
                      OrganizationId: org.id,
                      title: "manager",
                      email: "mike@lee.com",
                      password_hash: "here"});
          secondUser.save().then(function() {
            org.getUsers().then(function(users) {
              expect(users[0].first_name).to.equal("john");
              expect(users[0].title).to.equal("boss");
              expect(users[1].first_name).to.equal("mike");
              expect(users[1].title).to.equal("manager");
              done();
            });
          });
        });
      });
    });
  });

  it("Create a new User and find the corresponding Organization with User.getOrganization()", function(done){
    var newOrg = db.Organization.build({name:"Dog Clothes",
                    address: "123 fake street",
                    city: "San Francisco",
                    state: "CA",
                    zip: "94122",
                    country: "USA",
                    industry: "apparel",
                    password_hash: "bla"});
    newOrg.save().then(function(x){
      var find = db.Organization.findOne({name:"Dog Clothes"})
      .then(function(org){
        expect(org.city).to.equal("San Francisco");
        expect(org.state).to.equal("CA");
        var user = db.User.build({first_name: "john",
                      last_name: "doe",
                      OrganizationId: org.id,
                      title: "boss",
                      email: "thefella@boss.com",
                      password_hash: "righton"});
        user.save().then(function() {
          user.getOrganization().then(function(userOrg) {
            expect(userOrg.name).to.equal("Dog Clothes");
            done();
          });
        });
      });
    });
  });

it("Create a new User and use User.checkPassword() to verify password is correct", function(done){
    var newOrg = db.Organization.build({name:"Dog Clothes",
                    address: "123 fake street",
                    city: "San Francisco",
                    state: "CA",
                    zip: "94122",
                    country: "USA",
                    industry: "apparel",
                    password_hash: "bla"});
    newOrg.save().then(function(x){
      var find = db.Organization.findOne({name:"Dog Clothes"})
      .then(function(org){
        expect(org.city).to.equal("San Francisco");
        expect(org.state).to.equal("CA");
        var user = db.User.build({first_name: "john",
                      last_name: "doe",
                      OrganizationId: org.id,
                      title: "boss",
                      email: "thefella@boss.com",
                      password_hash: "righton"});
        user.save().then(function() {
          db.User.findOne({ id: 1}).then(function(userPass){
            user.checkPassword("righton",function(val) {
              expect(val).to.equal(true);
              done();
            });
          });
        });
      });
    });
  });

});
