var React = require('react');
var appActions = require('../actions/appActions');
var Link = require('react-router').Link;

var NavBar = React.createClass({

  handleSignOut: function(){
    appActions.employeeSignOut();
  },

  render: function() {
    return (
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container-fluid">

          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand page-scroll" href="#page-top">Portalize</a>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav navbar-left">
              <li>
                <Link activeStyle={{color: '#2980B9'}} to={"/"}>Chat Portal</Link>
              </li>
              <li>
                <Link activeStyle={{color: '#2980B9'}} to={"/session-history"}>Session History</Link>
              </li>
            </ul>

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
          </div>

        </div>
      </nav>
    );
  }
});

module.exports = NavBar;
