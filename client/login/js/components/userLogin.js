var React = require('react');
var helper = require('./helper.js');

var UserLogin = React.createClass({
  render: function() {
    return (
      <div>      
        <ul className="form-fields">
            <label>Email</label>
            <input className='shortfield' type="email" ref="email" />
            <label>Password</label>
            <input className='shortfield' type="password" ref="password" />
            <button onClick={this.handleLogin}>Login</button>
        </ul>
      </div>
    )
  },

  handleLogin: function(e) {
    e.preventDefault();

    var resData = {
      email    : this.refs.email.getDOMNode().value,
      password : this.refs.password.getDOMNode().value
    }

    this.props.saveValues(resData);

    console.log(resData);

    var xmlhttp = helper.makePostRequest("/api/users/signin", resData);
    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4) {
         var answer = JSON.parse(xmlhttp.responseText);
         window.location.href=window.location.origin + "?token=" + answer.token;
      }
    }
  }
})

module.exports = UserLogin;
