var React = require('react');
var appActions = require('../actions/appActions');

var NavBar = React.createClass({

  handleSignOut: function(){
    appActions.employeeSignOut();
  },

  render: function() {
    return (
      <nav className='navbar navbar-default'>
        <div className='navbar-brand'>Supportal</div>
        <div className='navbar-collapse collapse'>
          <ul className='nav navbar-right'>
            <li onClick={this.handleSignOut}>Sign Out</li>
          </ul>
          <ul className='nav navbar-right'>
            <li>User logged in as: {this.props.firstName} {this.props.lastName}</li>
            <li>Email: {this.props.email}</li>
            <li>Organization: {this.props.web_name}</li>
          </ul>
        </div>
      </nav>
    );
  }
});

module.exports = NavBar;
