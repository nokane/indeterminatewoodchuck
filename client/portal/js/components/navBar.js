var React = require('react');
var appActions = require('../actions/appActions');

var NavBar = React.createClass({

  handleSignOut: function(){
    appActions.employeeSignOut();
  },

  render: function() {
    return (
      <nav className='navbar navbar-default'>
        <div className='container-fluid'>
          <div className='navbar-brand'>Supportal</div>
          <div className='collapse navbar-collapse'>
            <ul className='nav navbar-nav navbar-right'>
              <li className='dropdown'>
                <a href='#' className='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true' aria-expanded='false'>{this.props.firstName} {this.props.lastName} <span className='caret'></span></a>
                <ul className='dropdown-menu'>
                  <li className='dropdown-header'>{this.props.web_name}</li>
                  <li className='dropdown-header'>{this.props.email}</li>
                  <li role='separator' className='divider'></li>
                  <li><a href='#' onClick={this.handleSignOut}>Sign Out</a></li>
                </ul>
              </li>
            </ul>
            <ul className='nav navbar-right'>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
});

module.exports = NavBar;
