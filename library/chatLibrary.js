var head = document.getElementsByTagName('head')[0];
var socketScript = document.createElement('script');
var icecommScript = document.createElement('script');
socketScript.src = 'https://cdn.socket.io/socket.io-1.3.5.js';
icecommScript.src = 'https://cdn.icecomm.io/icecomm.js';
head.appendChild(socketScript);
head.appendChild(icecommScript);

var chatButton = document.getElementById('chat-button');

var createChatSession = function() {
  // should we pass in company name or other identifier?
  var comm = new Icecomm('ZZ2RA1DsHd9xdCqdoeJ8Wwra5A5fUKipAVrvzX6vOGHlLiAdO');
  var chatWindow = document.createElement('div');
  chatButton.parentNode.appendChild(chatWindow);

  // Change this to our server url
  var socket = io('http://localhost:3000');

  // will need to emit some kind of customer number?
  socket.emit('customerRequest');

  socket.on('joinRoom', function(data) {
    setupVideoChatListeners(comm, chatWindow, data);
  });
};

var setupVideoChatListeners = function(comm, chatWindow, data){
  comm.on('connected', function(peer) {
    chatWindow.appendChild(peer.getVideo());
  });

  comm.on('local', function(self) {
    chatWindow.appendChild(self.getVideo());
  });

  comm.on('disconnect', function() {
    comm.leave(true);
    chatWindow.remove();
  });

  // figure out what format data is being sent back with
  comm.connect(data.SOMETHING);
};

chatButton.addEventListener('click', createChatSession, false);
