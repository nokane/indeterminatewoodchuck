var Supportal = function(orgName){
  this.init();

  // Client will need to add a button and div with these IDs for library to work
  this.chatButton = document.getElementById('supportal-init-button');
  this.chatWindow = document.getElementById('supportal-window');
  
  // Elements to be appended on icecomm connect
  this.localVideo = document.createElement('video');
  this.remoteVideo = document.createElement('video');
  this.textChat = document.createElement('div');

  this.localVideo.autoplay = true;
  this.localVideo.id = 'supportal-local-video';
  this.remoteVideo.autoplay = true;
  this.remoteVideo.id = 'supportal-remote-video';
  this.textChat.id = 'supportal-text-chat';
  this.textChat.innerHTML = '<form onSubmit="this.sendTextMessage">' +
      '<input id="supportal-text-chat-input" type=text placeholder="Type your message here" />' +
      '<input type=submit />' +
    '</form>' +
    '<div id="supportal-message-log"></div>';

  this.chatButton.addEventListener('click', function(){
    this.createChatSession();
  }.bind(this), false);
};

Supportal.prototype.init = function(){
  var head = document.getElementsByTagName('head')[0];
  var socketScript = document.createElement('script');
  var icecommScript = document.createElement('script');
  socketScript.src = 'https://cdn.socket.io/socket.io-1.3.5.js';
  icecommScript.src = 'https://cdn.icecomm.io/icecomm.js';

  socketScript.onload = function(){
    // need to change io connection point if want to test locally
    this.socket = io('http://hidden-sands-2214.herokuapp.com/');
  }.bind(this);

  icecommScript.onload = function(){
    this.comm = new Icecomm('ZZ2RA1DsHd9xdCqdoeJ8Wwra5A5fUKipAVrvzX6vOGHlLiAdO');
  }.bind(this);

  head.appendChild(socketScript);
  head.appendChild(icecommScript);
};

Supportal.prototype.createChatSession = function() {
  this.setupPeerConnListeners();

  // emit 'customerRequest' with orgName passed in on object instantiation
  this.socket.emit('customerRequest', orgName);

  // should we pass in company name or other identifier?
  this.socket.on('customerRoom', function(data) {
    this.comm.connect(data);
  }.bind(this));
};

Supportal.prototype.setupPeerConnListeners = function(){
  // helper function to append message node to supportal-message-log element
  var appendTextMessage = function(user, message) {
    var messageNode = document.createElement('div');
    messageNode.textContent = user + ': ' + message;
    document.getElementById('supportal-message-log').appendChild(messageNode);
  };

  // listener to start peer video stream when a peer connects
  this.comm.on('connected', function(peer) {
    this.chatWindow.appendChild(this.remoteVideo);
    this.remoteVideo.src = peer.stream;
    this.chatWindow.appendChild(this.textChat);

    // after connecting, set up listener for text chat submit
    var submitForm = this.textChat.firstChild;
    var handleSubmit = function(event) {
      var message = event.target[0].value;
      event.preventDefault();
      this.comm.send(message);
      appendTextMessage('customer', message);
      document.getElementById('supportal-text-chat-input').value = '';
    }.bind(this);

    if(submitForm.addEventListener) { // for modern browsers
      submitForm.addEventListener("submit", handleSubmit, false);
    } else if(submitForm.attachEvent) { // for older browsers
      submitForm.attachEvent('onsubmit', handleSubmit);
    }
  }.bind(this));

  // listener to start local video when iceComm gets a room name
  this.comm.on('local', function(self) {
    this.chatWindow.appendChild(this.localVideo);
    this.localVideo.src = self.stream;
  }.bind(this));

  this.comm.on('data', function(message) {
    appendTextMessage('staff', message.data);
  });

  // listener to close video streams and leave room when peer disconnects
  this.comm.on('disconnect', function(peer) {
    // remove peer video window
    document.getElementById(peer.ID).remove();

    // closes audio/video stream
    this.comm.close();

    // remove all children nodes of chatWindow (should just be local)
    while(this.chatWindow.firstChild) {
      this.chatWindow.removeChild(this.chatWindow.firstChild);
    }

    // client leaves iceComm room
    this.comm.leave(true);
  }.bind(this));
};
