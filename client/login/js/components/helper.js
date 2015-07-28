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
  },

  userDataValid: function(data, cb) {
    var emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i;
    var nameRegex = /^[A-Za-z0-9 ]{3,20}$/;
    if (data.email === '' || !emailRegex.test(data.email)) {
      cb("invalid email address");
      return false;
    }
    else if (data.firstName === '' || !nameRegex.test(data.firstName)) {
      cb("invalid first name");
      return false;
    }
    else
    {
      return true;
    }
  }
};

module.exports = Helper;