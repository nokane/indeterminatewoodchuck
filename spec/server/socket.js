var expect = require('chai').expect;
var io = require('socket.io-client');
var ioserver = require('socket.io');
var socketRoute = require('./../../server/socketroute.js');
var socketTestURL = 'http://127.0.0.1:3000';

var options = {
  transports: ['websocket'],
  'force new connection': true
};

var server = require('../../server/server.js');
describe('Socket.io Server Routing', function() {
  it('Should create new room on "staffReady"', function(done) {
    var staffSocket = io.connect(socketTestURL, options);
    staffSocket.on('connect', function(data){
      staffSocket.emit('staffReady', 'roomname1')
    });
    staffSocket.on('staffRoom', function(name) {
      var rooms = server.socketroute.rooms;
      expect(rooms).to.have.length(1);
      done();
    });
  });

});
