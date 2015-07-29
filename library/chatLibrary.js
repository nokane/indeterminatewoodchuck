var Supportal = function(orgName){
  this.init();
  this.orgName = orgName;
  this.customerName = null;
  this.chatListenersExist = false;

  this.supportalSlide = document.createElement('div');
  this.supportalSlide.id = 'supportal-slide';
  this.supportalSlide.className = 'supportal-slide-down';
  document.body.appendChild(this.supportalSlide);

  // Client will need to add a button and div with these IDs for library to work
  this.chatButton = document.createElement('button');
  this.chatButton.id = 'supportal-init-button';
  this.chatButton.className = 'btn btn-default';
  this.chatButton.textContent = 'Chat with a representative';
  this.supportalSlide.appendChild(this.chatButton);

  this.chatWindow = document.createElement('div');
  this.chatWindow.id = 'supportal-window';
  this.supportalSlide.appendChild(this.chatWindow);

  // Cached content from business
  this.chatButtonContent = this.chatButton.textContent;

  // Elements to be appended on icecomm connect
  this.localVideo = document.createElement('video');
  this.remoteVideo = document.createElement('video');
  this.textChat = document.createElement('div');

  this.localVideo.autoplay = true;
  this.localVideo.id = 'supportal-local-video';

  this.remoteVideo.autoplay = true;
  this.remoteVideo.id = 'supportal-remote-video';

  this.textChat.id = 'supportal-text-chat';

  this.textChat.innerHTML = '<div id="supportal-message-log"></div> \
                             <form id="supportal-chat-form" class="form-group"> \
                               <div class="input-group"> \
                                 <input type="text" id="supportal-text-chat-input" class="form-control" required /> \
                                 <span class="input-group-btn"> \
                                   <button class="btn btn-primary" type="submit">Submit</button> \
                                 </span> \
                                </div> \
                              </form>';

  this.chatButton.addEventListener('click', this._initialClickHandler.bind(this), false);
};

Supportal.prototype._initialClickHandler = function(){
  this.renderDetailForm();
  this.supportalSlide.classList.remove('supportal-slide-down');
  this.supportalSlide.classList.add('supportal-slide-up');
  this._changeEventListener('click', this._cancelClickHandler.bind(this), 'Cancel Request');
};

Supportal.prototype._cancelClickHandler = function(){
  this.chatWindow.innerHTML = '';
  this.supportalSlide.classList.remove('supportal-slide-up');
  this.supportalSlide.classList.add('supportal-slide-down');
  this._changeEventListener('click', this._initialClickHandler.bind(this), this.chatButtonContent);
  this.socket.emit('exitQueue');
  this.comm.close();
  this.comm.leave(true);
};

Supportal.prototype._changeEventListener = function(eventType, newHandler, textContent){
  var elClone = this.chatButton.cloneNode(true);
  this.chatButton.parentNode.replaceChild(elClone, this.chatButton);
  this.chatButton = elClone;
  this.chatButton.textContent = textContent;
  this.chatButton.addEventListener(eventType, newHandler);
};

Supportal.prototype.renderDetailForm = function(){
  var form = document.createElement('form');
  form.id = 'supportal-user-detail';

  form.addEventListener('submit', function(e){
    e.preventDefault();

    this.customerName = e.target[0].value;

    var userDetails = {
      name: e.target[0].value,
      email: e.target[1].value,
      question: e.target[2].value,
      orgName: this.orgName
    };

    this.createChatSession(userDetails);
    this.chatWindow.removeChild(this.chatWindow.firstChild);

  }.bind(this), false);

  form.innerHTML = '<legend>How Can We Help?</legend> \
                    <div class="form-group"> \
                      <label>Name</label> \
                      <input type="name" class="form-control" required /> \
                    </div> \
                    <div class="form-group"> \
                      <label>Email Address</label> \
                      <input type="email" class="form-control" required /> \
                    </div> \
                    <div class="form-group"> \
                      <label>Question</label> \
                      <textarea id="supportal-form-question" class="form-control" required></textarea> \
                    </div> \
                    <button type="submit" class="btn btn-default">Submit</button>';

  this.chatWindow.appendChild(form);
};

Supportal.prototype.init = function(){
  var head = document.getElementsByTagName('head')[0];
  var bootStrapLink = document.createElement('link');
  var stylesLink = document.createElement('link');
  var socketScript = document.createElement('script');
  var icecommScript = document.createElement('script');
  bootStrapLink.setAttribute('rel', 'stylesheet');
  bootStrapLink.setAttribute('type', 'text/css');
  bootStrapLink.setAttribute('href', 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css');
  stylesLink.setAttribute('rel', 'stylesheet');
  stylesLink.setAttribute('type', 'text/css');
  stylesLink.setAttribute('href', 'http://localhost:3000/librarystyles');
  socketScript.src = 'https://cdn.socket.io/socket.io-1.3.5.js';
  icecommScript.src = 'https://cdn.icecomm.io/icecomm.js';

  socketScript.onload = function(){
    // need to change io connection point if want to test locally
    this.socket = io('http://localhost:3000');
  }.bind(this);

  icecommScript.onload = function(){
    this.comm = new Icecomm('ZZ2RA1DsHd9xdCqdoeJ8Wwra5A5fUKipAVrvzX6vOGHlLiAdO');
  }.bind(this);

  head.appendChild(bootStrapLink);
  head.appendChild(stylesLink);
  head.appendChild(socketScript);
  head.appendChild(icecommScript);
};

Supportal.prototype.createChatSession = function(userDetails) {
  // Only set up listeners if they haven't yet been created
  if (!this.chatListenersExist) {
    this.chatListenersExist = true;
    this.setupPeerConnListeners();
    this.setupSocketListeners();
  }

  // emit 'customerRequest' with orgName passed in on object instantiation
  this.socket.emit('customerRequest', userDetails);
};

Supportal.prototype.setupSocketListeners = function(){

  this.socket.on('staffUnavailable', function(){
    var container = document.createElement('div');
    container.className = 'supportal-message-container';

    var notAvailable = document.createElement('h4');
    notAvailable.textContent = 'No customer service representatives are available right now. Please try again at a later time.';
    notAvailable.style['margin-top'] = '0px';
    this.chatWindow.innerHTML = '';
    this.chatWindow.appendChild(container);
    container.appendChild(notAvailable);
  }.bind(this));

  this.socket.on('customerQueueStatus', function(position){
    var container = document.createElement('div');
    container.className = 'supportal-message-container';

    var queueStatus = document.createElement('h4');
    queueStatus.textContent = 'A customer service representative will be with you shortly. You are currently in position ' + position + ' in the queue.';
    queueStatus.style['margin-top'] = '0px';
    this.chatWindow.innerHTML = '';
    this.chatWindow.appendChild(container);
    container.appendChild(queueStatus);
  }.bind(this));

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
    var chatView = document.getElementById('supportal-message-log');
    chatView.scrollTop = chatView.scrollHeight;
  };

  var disconnect = function() {
    // remove all children nodes of chatWindow (should just be local)
    this.chatWindow.innerHTML = '';
    this.chatWindow.style.display = 'none';

    var thankYou = document.createElement('div');
    thankYou.id = 'supportal-thank-you';
    thankYou.innerHTML = 'Thank you for using Portalize.';
    this.chatButton.parentNode.replaceChild(thankYou, this.chatButton);

    // slide up so that thank you message is displayed
    this.supportalSlide.classList.remove('supportal-slide-down');
    this.supportalSlide.classList.add('supportal-slide-up');

    // closes audio/video stream
    this.comm.close();

    // client leaves iceComm room
    this.comm.leave(true);
  }.bind(this);

  // listener to start peer video stream when a peer connects
  this.comm.on('connected', function(peer) {
    this.chatWindow.appendChild(this.remoteVideo);
    this.remoteVideo.src = peer.stream;
    this.chatWindow.appendChild(this.textChat);

    var chatView = document.getElementById('supportal-message-log');

    // after connecting, set up listener for text chat submit
    var submitForm = document.getElementById('supportal-chat-form');
    var handleSubmit = function(event) {
      var message = event.target[0].value;
      event.preventDefault();
      this.comm.send(message);
      appendTextMessage(this.customerName, message);
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
    this.chatWindow.innerHTML = '';
    this.chatWindow.appendChild(this.localVideo);
    this.localVideo.src = self.stream;
  }.bind(this));

  this.comm.on('data', function(message) {
    if( message.data === 'chropdhopycdchardosdchroyp' ){
      disconnect();
    }

    appendTextMessage('staff', message.data);
  });

  // listener to close video streams and leave room when peer disconnects
  this.comm.on('disconnect', disconnect);
};
