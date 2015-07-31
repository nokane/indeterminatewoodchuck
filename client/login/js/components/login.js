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
            <div className='column-left'>
              <div className='login-content'>
                <span className='intro-text'>
                  Portalize's customer support platform is a simple solution for e-commerce businesses to
                  utilize video chat on their websites, providing a means to communicate face to face with
                  customers. With just a few lines of code from our JavaScript library, businesses are able
                  to add a customer facing video chat interface to their website. In addition, Portalize provides
                  support staff with a portal to interact with their customers. Our service makes it easy
                  for businesses to provide live customer support, improving their customers' shopping experience
                </span>
              </div>
            </div>
          </div>

          <div className='column'>
            <div className='column-right'>
              <UserSignup fieldValues={this.state.fieldValues}
                                   saveValues={this.saveValues} handleError={this.handleError} />
            </div>
          </div>
        </div>

        <div className='view'>
          <div className='column'>
            <div className = 'column-left'>
            </div>
          </div>
          <div className='column'>
            <div className = 'column-right'>
              <OrgAccountQuery fieldValues={this.state.fieldValues}
                                   saveValues={this.saveValues}
                                   showOrgLogin = {this.showOrgLogin}
                                   showOrgSignup = {this.showOrgSignup} />
            </div>
          </div>
        </div>

        <div className='view'>

          <div className='column'>
            <div className = 'column-left'>
            </div>
          </div>

          <div className='column'>
            <div className='column-right'>
              {this.state.showOrgLogin ? <OrgLogin fieldValues={this.state.fieldValues}
                                   saveValues={this.saveValues} clearErrors={this.clearErrors}
                                   handleError={this.handleError} /> :
              this.state.showOrgSignup ? <OrgSignup fieldValues={this.state.fieldValues}
                                   saveValues={this.saveValues} clearErrors={this.clearErrors}
                                   handleError={this.handleError} />:<div></div>}
              {this.state.orgSignupErrorMessage ? <Error errorMessage={this.state.orgSignupErrorMessage} /> :
              this.state.orgLoginErrorMessage ? <Error errorMessage={this.state.orgLoginErrorMessage} /> : <div className='errorView'> </div> }
            </div>
          </div>

        </div>
      </div>
    )
  }
});

module.exports = Login;
