var React = require('react');

var Helper = {
  makePostRequest: function(route, data) {
    var xmlhttp = new XMLHttpRequest();
    if (!window.location.origin)
      window.location.origin = window.location.protocol+"//"+window.location.host;    
    xmlhttp.open("POST", window.location.origin + route, true);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(JSON.stringify(data));
    return xmlhttp;
  }
};

module.exports = Helper;