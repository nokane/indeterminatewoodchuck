var should = require('should');
var io = require('socket.io-client');
var socketRoute = require('./../../server/socketroute.js')
var socketTestURL = 'http://0.0.0.0:8080';

var options = {
  transports: ['websocket'],
  'force new connection': true
};


describe('Socket.io Server Routing', function() {
  it('Should create new room on "staffReady"', function(done) {
    var staffSocket = io.connect(socketTestURL, options);
    staffSocket.on('connect', function(data){
      staffSocket.emit('staffReady', 'roomname')
    });
    socketRoute.rooms.length.should.equal(1);
    done();

  });

});
