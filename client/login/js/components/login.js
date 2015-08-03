var React           = require('react');
var UserLogin       = require('./userLogin.js');
var UserSignup      = require('./userSignup.js');
var OrgAccountQuery = require('./orgAccountQuery.js');
var OrgLogin        = require('./orgLogin.js');
var OrgSignup       = require('./orgSignup.js');
var Error           = require('./error.js');
var assign          = require('object-assign');

var Login = React.createClass({
  getInitialState: function() {
    return {
      fieldValues: {firstName    : null,
                    lastName     : null,
                    jobTitle     : null,
                    email2       : null,
                    password2    : null},
      showOrgLogin : 0,
      showOrgSignup : 0,
      userLoginErrorMessage: null,
      userSignupErrorMessage: null,
      orgLoginErrorMessage: null,
      orgSignupErrorMessage: null
    };
  },

  showOrgLogin: function() {
    this.setState({
      showOrgLogin: 1,
      showOrgSignup: 0
    });
    this.clearErrors();
  },

  showOrgSignup: function() {
    this.setState({
      showOrgLogin: 0,
      showOrgSignup: 1
    });
    this.clearErrors();
  },

  handleError: function(section, errorMessage) {
    var newState = {};
    newState[section] = errorMessage;
    this.setState(newState);
    var _this = this;
    setTimeout(function() {_this.clearErrors()}, 2000);
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
    this.setState({userLoginErrorMessage: null,
    userSignupErrorMessage: null,
    orgLoginErrorMessage: null,
    orgSignupErrorMessage: null});
  },

  render: function() {
    return (
      <div className='loginSection'>
        <div className='view'>
          <div className='column'>
            <UserSignup fieldValues={this.state.fieldValues}
                                   saveValues={this.saveValues} handleError={this.handleError} />

            <OrgAccountQuery fieldValues={this.state.fieldValues}
                                 saveValues={this.saveValues}
                                 showOrgLogin = {this.showOrgLogin}
                                 showOrgSignup = {this.showOrgSignup} />

            {this.state.showOrgLogin ? <OrgLogin fieldValues={this.state.fieldValues}
                                 saveValues={this.saveValues} clearErrors={this.clearErrors}
                                 handleError={this.handleError} /> :
            this.state.showOrgSignup ? <OrgSignup fieldValues={this.state.fieldValues}
                                 saveValues={this.saveValues} clearErrors={this.clearErrors}
                                 handleError={this.handleError} />:<div></div>}
            {this.state.orgSignupErrorMessage ? <Error errorMessage={this.state.orgSignupErrorMessage} /> :
            this.state.orgLoginErrorMessage ? <Error errorMessage={this.state.orgLoginErrorMessage} /> : <div className='errorView'></div> }
          </div>
        </div>
      </div>
    )
  }
});

module.exports = Login;
