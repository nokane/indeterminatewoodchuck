require("dotenv").load();
var expect = require("chai").expect;
var express = require("express");
var db = require("../../../server/models/index.js");

describe("Organization Model", function(){

  beforeEach(function(done){
    db.sequelize.sync({force: true}).then(function(){
      done();
    });
  });

  it("Create a new Organization and then find that same Organization with Organization.findOne()", function(done){
    var newOrg = db.Organization.build({name:"Shoe Locker", 
                    address: "123 fake street",
                    city: "San Francisco",
                    state: "CA",
                    zip: "94122",
                    country: "USA",
                    industry: "apparel",
                    password_hash: "bla"});
    newOrg.save().then(function(x){
      db.Organization.findOne({name:"Shoe Locker"})
      .then(function(org){
        expect(org.city).to.equal("San Francisco");
        expect(org.state).to.equal("CA");
        expect(org.web_name).to.equal("ShoeLocker");
        done();
      });
    });
  });

  it("Create a new Organization and use Organization.checkPassword() to verify password is correct", function(done){
    var newOrg = db.Organization.build({name:"Shoe Locker",
                    address: "123 fake street",
                    city: "San Francisco",
                    state: "CA",
                    zip: "94122",
                    country: "USA",
                    industry: "apparel",
                    password_hash: "bla"});
    newOrg.save().then(function(x){
      db.Organization.findOne({name:"Shoe Locker"}).then(function(org){
        org.checkPassword("bla", function(val) {
          expect(val).to.equal(true)
          done();
        });
      });
    });
  });

});
