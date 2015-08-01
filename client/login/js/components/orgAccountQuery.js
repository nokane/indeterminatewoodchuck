var React = require('react');

var OrgAccountQuery = React.createClass({
  render: function() {
    return (
      <div>
        <table className='org-account-query'>
          <td><button className='formChoice' onClick={this.handleShowOrgLogin}>Join Existing Organization</button></td>
          <td><button className='formChoice' onClick={this.handleShowOrgSignup}>Create Organization</button></td>
        </table>
      </div>
    )
  },

  handleShowOrgLogin: function(event) {
    event.preventDefault();
    this.props.showOrgLogin();
  },

  handleShowOrgSignup: function(event) {
    event.preventDefault();
    this.props.showOrgSignup();
  }
});

module.exports = OrgAccountQuery;
