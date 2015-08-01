var React = require('react');
var helper = require('./helper.js');

var UserLogin = React.createClass({
  render: function() {
    return (
      <form className="navbar-form navbar-right">
        <div className="form-group">
          <label className="navbar-label">Email: </label>
          <input className='form-control' type="email" ref="email" />
          
          <label className="navbar-label">Password: </label>
          <input className='form-control' type="password" ref="password" />
          
          <button type="submit" className='btn btn-default navbar-btn' onClick={this.handleLogin}>Login</button>
        </div>
      </form>
    )
  },

  handleLogin: function(e) {
    e.preventDefault();

    var resData = {
      email    : this.refs.email.getDOMNode().value,
      password : this.refs.password.getDOMNode().value
    }

    this.props.saveValues(resData);

    var xmlhttp = helper.makePostRequest("/api/users/signin", resData);
    var _this = this;
    if (helper.userDataValid(resData, function(message) {
      _this.props.handleError("userLoginErrorMessage", message);
    })) {    
      xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4) {
           var answer = JSON.parse(xmlhttp.responseText);
           if (answer.success === 'false') {
             _this.props.handleError("userLoginErrorMessage", answer.message);
           }
           else {
             window.location.href=window.location.origin + '/portal';
           }
        }
      }
    }
  }
});

module.exports = UserLogin;
