require("dotenv").load();
var expect = require("chai").expect;
var express = require("express");
var db = require("../../../server/models/index.js");

describe("Session Model", function(){

  beforeEach(function(done){
    db.sequelize.sync({force: true}).then(function(){
      done();
    });
  });

  it("Create a new Session and find that Session with Session.findOne()", function(done){
    var newOrg = db.Organization.build({name:"Bait Shop",
                    address: "123 fake street",
                    city: "San Francisco",
                    state: "CA",
                    zip: "94122",
                    country: "USA",
                    industry: "apparel",
                    password_hash: "bla"});
    newOrg.save().then(function(x){
      db.Organization.findOne({name:"Bait Shop"})
        .then(function(org){
        var user = db.User.build({first_name: "john",
                      last_name: "doe",
                      OrganizationId: org.id,
                      title: "boss",
                      email: "thefella@boss.com",
                      password_hash: "righton"});
        user.save().then(function() {
          org.getUsers().then(function(users) {
            var session = db.Session.build({room_name: "blue_room",
                            OrganizationId: org.id,
                            UserId: users[0].id});
            session.save().then(function() {
              db.Session.findOne({id: 1}).then(function(foundSession) {
                expect(foundSession.room_name).to.equal("blue_room");
                done();
              });
            });
          });
        });
      });
    });
  });

  it("Create a new Session and find that Session with Organization.getSessions()", function(done){
    var newOrg = db.Organization.build({name:"Bait Shop",
                    address: "123 fake street",
                    city: "San Francisco",
                    state: "CA",
                    zip: "94122",
                    country: "USA",
                    industry: "apparel",
                    password_hash: "bla"});
    newOrg.save().then(function(x){
      db.Organization.findOne({name:"Bait Shop"})
        .then(function(org){
        var user = db.User.build({first_name: "john",
                      last_name: "doe",
                      OrganizationId: org.id,
                      title: "boss",
                      email: "thefella@boss.com",
                      password_hash: "righton"});
        user.save().then(function() {
          org.getUsers().then(function(users) {
            var session = db.Session.build({room_name: "blue_room",
                            OrganizationId: org.id,
                            UserId: users[0].id});
            session.save().then(function() {
              org.getSessions().then(function(orgSession) {
                expect(orgSession[0].room_name).to.equal("blue_room");
                done();
              });
            });
          });
        });
      });
    });
  });

  it("Create a new Session and find that Session with User.getSessions()", function(done){
    var newOrg = db.Organization.build({name:"Bait Shop",
                    address: "123 fake street",
                    city: "San Francisco",
                    state: "CA",
                    zip: "94122",
                    country: "USA",
                    industry: "apparel",
                    password_hash: "bla"});
    newOrg.save().then(function(x){
      db.Organization.findOne({name:"Bait Shop"})
        .then(function(org){
        var user = db.User.build({first_name: "john",
                      last_name: "doe",
                      OrganizationId: org.id,
                      title: "boss",
                      email: "thefella@boss.com",
                      password_hash: "righton"});
        user.save().then(function() {
          org.getUsers().then(function(users) {
            var session = db.Session.build({room_name: "blue_room",
                            OrganizationId: org.id,
                            UserId: users[0].id});
            session.save().then(function() {
              users[0].getSessions().then(function(userSession) {
                expect(userSession[0].room_name).to.equal("blue_room");
                done();
              });
            });
          });
        });
      });
    });
  });

  it("Create a new Session and find the corresponding Organization with Session.getOrganization()", function(done){
    var newOrg = db.Organization.build({name:"Bait Shop",
                    address: "123 fake street",
                    city: "San Francisco",
                    state: "CA",
                    zip: "94122",
                    country: "USA",
                    industry: "apparel",
                    password_hash: "bla"});
    newOrg.save().then(function(x){
      db.Organization.findOne({name:"Bait Shop"})
        .then(function(org){
        var user = db.User.build({first_name: "john",
                      last_name: "doe",
                      OrganizationId: org.id,
                      title: "boss",
                      email: "thefella@boss.com",
                      password_hash: "righton"});
        user.save().then(function() {
          org.getUsers().then(function(users) {
            var session = db.Session.build({room_name: "blue_room",
                            OrganizationId: org.id,
                            UserId: users[0].id});
            session.save().then(function() {
              session.getOrganization().then(function(foundOrg) {
                expect(foundOrg.name).to.equal("Bait Shop");
                done();
              });
            });
          });
        });
      });
    });
  });

  it("Create a new Session and find the corresponding User with Session.getUser()", function(done){
    var newOrg = db.Organization.build({name:"Bait Shop",
                    address: "123 fake street",
                    city: "San Francisco",
                    state: "CA",
                    zip: "94122",
                    country: "USA",
                    industry: "apparel",
                    password_hash: "bla"});
    newOrg.save().then(function(x){
      db.Organization.findOne({name:"Bait Shop"})
        .then(function(org){
        var user = db.User.build({first_name: "john",
                      last_name: "doe",
                      OrganizationId: org.id,
                      title: "boss",
                      email: "thefella@boss.com",
                      password_hash: "righton"});
        user.save().then(function() {
          org.getUsers().then(function(users) {
            var session = db.Session.build({room_name: "blue_room",
                            OrganizationId: org.id,
                            UserId: users[0].id});
            session.save().then(function() {
              session.getUser().then(function(foundUser) {
                expect(foundUser.first_name).to.equal("john");
                done();
              });
            });
          });
        });
      });
    });
  });

});
