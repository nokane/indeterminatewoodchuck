var expect = require('chai').expect;
var io = require('socket.io-client');
var ioserver = require('socket.io');
var socketTestURL = 'http://127.0.0.1:3000';

var options = {
  transports: ['websocket'],
  'force new connection': true
};

var server = require('../../index.js');
describe('Socket.io Server Routing', function() {
  it('Should create new room on "staffReady"', function(done) {
    var staffSocket = io.connect(socketTestURL, options);
    staffSocket.on('connect', function(data){
      staffSocket.emit('staffReady', 'roomname1')
    });
    staffSocket.on('staffRoom', function(name) {
      expect(name).to.equal('room1');
      staffSocket.disconnect();
      done();
    });
  });

  it('Second roomname should equal "room2"', function(done) {
    var staffSocket1 = io.connect(socketTestURL, options);
    staffSocket1.on('connect', function(data){
      staffSocket1.emit('staffReady', 'roomname1')
    });
    staffSocket1.on('staffRoom', function(name) {
      expect(name).to.equal('room2');
      staffSocket1.disconnect();
      done();
    });
  });

  it('"staffRoom" should only be sent to socket connection that sent "staffReady"', function(done) {
    var staffSocket1 = io.connect(socketTestURL, options);
    var staffSocket2 = io.connect(socketTestURL, options);
    staffSocket2.on('connect', function(data){
      staffSocket2.emit('staffReady', 'roomname1')
    });
    staffSocket1.on('staffRoom', function(name) {
      expect(Constructor).to.throw(Error);
      console.log("ERROR");
    });
    staffSocket2.on('staffRoom', function(name) {
      done();
    });    
  });

});
