var Portalize = function(orgName, displayOption){
  this.init();
  this.orgName = orgName;
  this.customerName = null;
  this.chatListenersExist = false;
  this.chatButtonContent = null;
  this.displayOption = displayOption;
  this.createDOMElements();
};

// Init function which initializes all scripts and style links
Portalize.prototype.init = function(){
  var head = document.getElementsByTagName('head')[0];
  var bootStrapLink = document.createElement('link');
  var socketScript = document.createElement('script');
  var icecommScript = document.createElement('script');
  bootStrapLink.setAttribute('rel', 'stylesheet');
  bootStrapLink.setAttribute('type', 'text/css');
  bootStrapLink.setAttribute('href', 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css');
  socketScript.src = 'https://cdn.socket.io/socket.io-1.3.5.js';
  icecommScript.src = 'https://cdn.icecomm.io/icecomm.js';

  socketScript.onload = function(){
    // need to change io connection point if want to test locally
    this.socket = io('https://www.portalize.io');
  }.bind(this);

  icecommScript.onload = function(){
    this.comm = new Icecomm('ZZ2RA1DsHd9xdCqdoeJ8Wwra5A5fUKipAVrvzX6vOGHlLiAdO');
  }.bind(this);

  head.appendChild(bootStrapLink);
  head.appendChild(socketScript);
  head.appendChild(icecommScript);
};

Portalize.prototype.createDOMElements = function() {
  var createContainer = function() {
    this.portalizeContainer = document.createElement('div');
    this.portalizeContainer.id = 'portalize-slide-container';
    this.portalizeContainer.className = 'portalize-slide-down';
  }.bind(this);

  var createChatButton = function() {
    if (this.displayOption === 'slide') {
      this.chatButton = document.createElement('button');      
      this.chatButton.id = 'portalize-' + this.displayOption + '-init-button';
      this.chatButton.textContent = 'Chat with a representative';
    } else if (this.displayOption === 'embed') {
      // Client will need to add a button with id of 'portalize-embed-init-button' in html to embed
      this.chatButton = document.getElementById('portalize-' + this.displayOption + '-init-button');
    }
    this.chatButton.className = 'btn btn-default';
 
    // Cached content from business
    this.chatButtonContent = this.chatButton.textContent;
  }.bind(this);

  var createChatWindow = function() {
    if (this.displayOption === 'slide') {
      this.chatWindow = document.createElement('div');
      this.chatWindow.id = 'portalize-slide-window';
    } else if (this.displayOption === 'embed') {
      this.chatWindow = document.getElementById('portalize-' + this.displayOption + '-window');
    }
  }.bind(this);

  var createChatElements = function() {
    // Elements to be appended on icecomm connect
    this.localVideo = document.createElement('video');
    this.localVideo.autoplay = true;
    this.localVideo.id = 'portalize-' + this.displayOption + '-local-video';

    this.remoteVideo = document.createElement('video');
    this.remoteVideo.autoplay = true;
    this.remoteVideo.id = 'portalize-' + this.displayOption + '-remote-video';

    this.textChat = document.createElement('div');
    this.textChat.id = 'portalize-text-chat';
    this.textChat.innerHTML = '<div id="portalize-message-log"></div> \
                               <form id="portalize-chat-form" class="form-group"> \
                                 <div class="input-group"> \
                                   <input type="text" id="portalize-text-chat-input" class="form-control" required /> \
                                   <span class="input-group-btn"> \
                                     <button class="btn btn-primary" type="submit">Submit</button> \
                                   </span> \
                                  </div> \
                                </form>';
  }.bind(this);

  var createDisconnectButton = function() {
    this.disconnectButton = document.createElement('button');
    this.disconnectButton.id = 'portalize-disconnect-button';
    this.disconnectButton.className = 'btn btn-xs';
    this.disconnectButton.innerHTML = '<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>';
  }.bind(this);

  createChatButton();
  createChatWindow();
  createChatElements();
  if (this.displayOption === 'slide') {
    createContainer();
    document.body.appendChild(this.portalizeContainer);
    this.portalizeContainer.appendChild(this.chatButton);
    this.portalizeContainer.appendChild(this.chatWindow);
  } else if (this.displayOption === 'embed') {
    createDisconnectButton();
  }
};

Portalize.prototype.renderDetailForm = function(){
  var form = document.createElement('form');
  form.id = 'portalize-user-detail';

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
                      <input id="portalize-form-name" type="name" class="form-control" required /> \
                    </div> \
                    <div class="form-group"> \
                      <label>Email Address</label> \
                      <input id="portalize-form-email" type="email" class="form-control" required /> \
                    </div> \
                    <div class="form-group"> \
                      <label>Question</label> \
                      <textarea id="portalize-form-question" class="form-control" required></textarea> \
                    </div> \
                    <button type="submit" class="btn btn-default">Submit</button>';

  this.chatWindow.appendChild(form);
};

Portalize.prototype.createChatSession = function(userDetails) {
  // Only set up listeners if they haven't yet been created
  if (!this.chatListenersExist) {
    this.chatListenersExist = true;
    this.setupPeerConnListeners();
    this.setupSocketListeners();
  }

  // emit 'customerRequest' with orgName passed in on object instantiation
  this.socket.emit('customerRequest', userDetails);
};

Portalize.prototype.setupSocketListeners = function(){
  this.socket.on('staffUnavailable', function(){
    var container = document.createElement('div');
    container.className = 'portalize-message-container';

    var notAvailable = document.createElement('h4');
    notAvailable.textContent = 'No customer service representatives are available right now. Please try again at a later time.';
    notAvailable.style['margin-top'] = '0px';
    this.chatWindow.innerHTML = '';
    this.chatWindow.appendChild(container);
    container.appendChild(notAvailable);
    if (this.displayOption === 'embed') {
      this.chatWindow.appendChild(this.disconnectButton);
      this.disconnectButton.style.display = 'block';
    }
  }.bind(this));

  this.socket.on('customerQueueStatus', function(position){
    var container = document.createElement('div');
    container.className = 'portalize-message-container';

    var queueStatus = document.createElement('h4');
    queueStatus.textContent = 'A customer service representative will be with you shortly. You are currently in position ' + position + ' in the queue.';
    queueStatus.style['margin-top'] = '0px';
    this.chatWindow.innerHTML = '';
    this.chatWindow.appendChild(container);
    container.appendChild(queueStatus);
    if (this.displayOption === 'embed') {
      this.chatWindow.appendChild(this.disconnectButton);
      this.disconnectButton.style.display = 'block';
    }
  }.bind(this));

  this.socket.on('customerRoom', function(data) {
    this.comm.connect(data);
  }.bind(this));
};

Portalize.prototype.setupPeerConnListeners = function(){
  // helper function to append message node to portalize-message-log element
  var appendTextMessage = function(user, message) {
    var messageNode = document.createElement('div');
    messageNode.textContent = user + ': ' + message;
    document.getElementById('portalize-message-log').appendChild(messageNode);
    var chatView = document.getElementById('portalize-message-log');
    chatView.scrollTop = chatView.scrollHeight;
  };

  var disconnect = function() {
    // remove all children nodes of chatWindow (should just be local)
    this.chatWindow.innerHTML = '';
    this.chatWindow.style.display = 'none';

    var thankYou = document.createElement('div');
    thankYou.id = 'portalize-' + this.displayOption + '-thank-you';
    thankYou.innerHTML = 'Thank you for using Portalize.';
    this.chatButton.parentNode.replaceChild(thankYou, this.chatButton);

    if (this.displayOption === 'slide') {
      // slide up so that thank you message is displayed
      this.portalizeContainer.classList.remove('portalize-slide-down');
      this.portalizeContainer.classList.add('portalize-slide-up');
    }

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

    var chatView = document.getElementById('portalize-message-log');

    // after connecting, set up listener for text chat submit
    var submitForm = document.getElementById('portalize-chat-form');
    var handleSubmit = function(event) {
      var message = event.target[0].value;
      event.preventDefault();
      this.comm.send(message);
      appendTextMessage(this.customerName, message);
      document.getElementById('portalize-text-chat-input').value = '';
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


/////////////////////////////  Embedded Subclass /////////////////////////////

var PortalizeEmbed = function(orgName) {
  Portalize.call(this, orgName, 'embed');
  
  // Add initial click handler to chatButton
  this.chatButton.addEventListener('click', this._initialClickHandler.bind(this), false);
  
  // Add cancel click handler to disconnectButton
  this.disconnectButton.addEventListener('click', this._cancelClickHandler.bind(this), false);
};

PortalizeEmbed.prototype = Object.create(Portalize.prototype);
PortalizeEmbed.constructor = Portalize;

PortalizeEmbed.prototype._initialClickHandler = function(){
  this.renderDetailForm();
  this.chatWindow.appendChild(this.disconnectButton);
  this.disconnectButton.style.display = 'block';
  this.chatButton.style.display = 'none';
  this.chatWindow.style.display = 'block';
};

PortalizeEmbed.prototype._cancelClickHandler = function(){
  this.chatWindow.innerHTML = '';
  this.disconnectButton.style.display = 'none';
  this.chatButton.style.display = 'block';
  this.chatWindow.style.display = 'none';
  this.socket.emit('exitQueue');
  this.comm.close();
  this.comm.leave(true);
};


/////////////////////////////  Slide Up Subclass /////////////////////////////

var PortalizeSlide = function(orgName) {
  Portalize.call(this, orgName, 'slide');

  // Add initial click handler to chatButton
  this.chatButton.addEventListener('click', this._initialClickHandler.bind(this), false);
};

PortalizeSlide.prototype = Object.create(Portalize.prototype);
PortalizeSlide.constructor = Portalize;

PortalizeSlide.prototype._initialClickHandler = function(){
  this.renderDetailForm();
  this.portalizeContainer.classList.remove('portalize-slide-down');
  this.portalizeContainer.classList.add('portalize-slide-up');
  this._changeEventListener('click', this._cancelClickHandler.bind(this), 'Cancel Request');
};

PortalizeSlide.prototype._cancelClickHandler = function(){
  this.chatWindow.innerHTML = '';
  this.portalizeContainer.classList.remove('portalize-slide-up');
  this.portalizeContainer.classList.add('portalize-slide-down');
  this._changeEventListener('click', this._initialClickHandler.bind(this), this.chatButtonContent);
  this.socket.emit('exitQueue');
  this.comm.close();
  this.comm.leave(true);
};

PortalizeSlide.prototype._changeEventListener = function(eventType, newHandler, textContent){
  var elClone = this.chatButton.cloneNode(true);
  this.chatButton.parentNode.replaceChild(elClone, this.chatButton);
  this.chatButton = elClone;
  this.chatButton.textContent = textContent;
  this.chatButton.addEventListener(eventType, newHandler);
};
