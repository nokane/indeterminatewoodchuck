var React           = require('react');
var UserLogin       = require('./userLogin.js');
var UserSignup      = require('./userSignup.js');
var OrgAccountQuery = require('./orgAccountQuery.js');
var OrgLogin        = require('./orgLogin.js');
var OrgSignup       = require('./orgSignup.js');
var assign          = require('object-assign');

var fieldValues = {
  email        : null,
  password     : null,
  firstName    : null,
  lastName     : null,
  jobTitle     : null,
  email2       : null,
  password2    : null,
};

var Login = React.createClass({
  getInitialState: function() {
    return {
      showOrgLogin : 0,
      showOrgSignup : 0
    };
  },

  showOrgLogin: function() {
    this.setState({
      showOrgLogin: 1,
      showOrgSignup: 0
    });      
  },

  showOrgSignup: function() {
    this.setState({
      showOrgLogin: 0,
      showOrgSignup: 1
    });     
  },

  saveValues: function(field_value) {
    return function() {
      fieldValues = assign({}, fieldValues, field_value)
    }.bind(this)()
  },

  showValues: function() {
    console.log(fieldValues);
  },

  render: function() {

    return (
      <main className = 'container'>

        <section className='logo'>
         S U P P O R T A L
        </section>
        <section>
          <UserLogin fieldValues={fieldValues}
                                saveValues={this.saveValues} />
        </section>
        <div className='view'>
        <section>
          The quick brown fox jumped quickly over the yellow dog.  Lorem ipsum dolorem amet.  
          The quick brown fox jumped quickly over the yellow dog.  Lorem ipsum dolorem amet.  
          The quick brown fox jumped quickly over the yellow dog.  Lorem ipsum dolorem amet.  
          The quick brown fox jumped quickly over the yellow dog.  Lorem ipsum dolorem amet.    
        </section>

        <section>
          <UserSignup fieldValues={fieldValues}
                               saveValues={this.saveValues} />
        </section>

        </div>
        <div className='view'>

        <section>
        </section>

        <section>
          <OrgAccountQuery fieldValues={fieldValues}
                               saveValues={this.saveValues}
                               showOrgLogin = {this.showOrgLogin}
                               showOrgSignup = {this.showOrgSignup} />                                                           
        </section>

        </div>
        <div className='view'>

        <section>
        </section>

        <section>

          {this.state.showOrgLogin ? <OrgLogin fieldValues={fieldValues}
                               saveValues={this.saveValues}
                               showValues={this.showValues} /> :                               
          this.state.showOrgSignup ? <OrgSignup fieldValues={fieldValues}
                               saveValues={this.saveValues}
                               showValues={this.showValues} />:<div></div>}                              
        </section>

        </div>
      </main>
    )
  }
})

React.render(
  <Login />,
  document.getElementById('login-form')
);