var head = document.getElementsByTagName('head')[0];
var socketScript = document.createElement('script');
var icecommScript = document.createElement('script');
socketScript.src = 'https://cdn.socket.io/socket.io-1.3.5.js';
icecommScript.src = 'https://cdn.icecomm.io/icecomm.js';
head.appendChild(socketScript);
head.appendChild(icecommScript);
