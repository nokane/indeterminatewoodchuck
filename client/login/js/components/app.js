var React           = require('react');
var Login           = require('./login.js');
var UserLogin       = require('./userLogin.js');
var Error           = require('./error.js');

var AboutPage       = require('./aboutPage.js');
var GettingStarted  = require('./gettingStarted.js');

var assign          = require('object-assign');
var Router = require('react-router');
var Link = require('react-router').Link;

var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;
var RouteHandler = Router.RouteHandler;

var Main = React.createClass({
  getInitialState: function() {
    return {
      fieldValues: {email        : null,
                    password     : null }
    };
  },

  handleError: function(section, errorMessage) {
    var newState = {};
    newState[section] = errorMessage;
    this.setState(newState);
  },

  saveValues: function(fieldValues) {
    var newFields = {};
    var oldFields = this.state.fieldValues;
    for (var key in oldFields) {
      newFields[key] = oldFields[key];
    }
    for (var key in fieldValues) {
      newFields[key] = fieldValues[key];
    }
    this.setState({
      fieldValues: newFields 
    });
  },

  clearErrors: function() {
    this.setState({userLoginErrorMessage: null});
  },

  render: function() {
    return (
      <div className = 'container'>
      
        <nav id="mainNav" className="navbar navbar-default navbar-fixed-top">
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
                  <Link activeStyle={{color: '#2980B9'}} to={"/"}>About</Link>
                </li>
                <li>
                  <Link activeStyle={{color: '#2980B9'}} to={"/getting-started"}>Getting Started</Link>
                </li>
                <li>
                  <Link activeStyle={{color: '#2980B9'}} to={"/signup"}>Sign Up</Link>
                </li>
              </ul>
              <UserLogin fieldValues={this.state.fieldValues} saveValues={this.saveValues} handleError={this.handleError} />
            </div>
          </div>
        </nav>

        <div className='column'>
            {this.state.userLoginErrorMessage ? <Error errorMessage={this.state.userLoginErrorMessage} /> :
            <div className='errorView'></div> }
        </div>

        <RouteHandler />

      </div>
    )
  }
});

var routes = (
  <Route handler={Main}>
    <DefaultRoute handler={AboutPage} />
    <Route path='about' handler={AboutPage} />
    <Route path='getting-started' handler={GettingStarted} />
    <Route path='signup' handler={Login} />
    <NotFoundRoute handler={AboutPage} />
  </Route>
);

Router.run(routes, function(Root) {
  React.render(<Root/>, document.getElementById('login-form'));
});
