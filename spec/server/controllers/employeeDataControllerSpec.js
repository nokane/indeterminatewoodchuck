require('dotenv').load();
var db = require('../../../server/models/index.js');
var expect = require('chai').expect;
var request = require('supertest');
var app = require('../../../index.js');

describe('Employee Data Controller', function(){


  it('should be able to get employee data when a user is logged in', function(done){
    // the respone should contain the stuff in that object
  });

});
