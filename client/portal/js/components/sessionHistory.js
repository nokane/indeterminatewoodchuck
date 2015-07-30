var React = require('react');
var sessionActions = require('../actions/sessionActions');
var SessionHistoryStore = require('../stores/sessionHistoryStore');
var SessionLog = require('./sessionLog');

var SessionHistory = React.createClass({

  getInitialState: function(){
    return SessionHistoryStore.getState();
  },

  componentWillMount: function(){
    this.getEmployeeSessionData();
  },

  componentDidMount: function(){
    SessionHistoryStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function(){
    SessionHistoryStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState(SessionHistoryStore.getState());
  },

  getEmployeeSessionData: function(){
    sessionActions.getEmployeeSessionData();
  },

  render: function(){
    return (
      <div>
        <button type="button" className="refresh btn btn-default" onClick={ this.getLogs }>
          <span className="glyphicon glyphicon-refresh" aria-hidden="true"></span>
        </button>
        <SessionLog sessions={ this.state.sessions } />
      </div>
    );
  }

});

module.exports = SessionHistory;

/* [ { cust_name: 'first customer', -
   cust_email: 'firstcustomer@gmail.com', -
   createdAt: '2015-07-29T17:50:38.782Z', -
   question: 'whatever', -
   UserId: 1,
   name: 'Hack Reactor',
   first_name: 'John', -
   last_name: 'Paulino', -
   email: 'paulinoj@gmail.com',
   title: 'Software Engineer' }] - */
