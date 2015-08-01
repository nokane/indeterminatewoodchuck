var React = require('react');
var sessionActions = require('../actions/sessionActions');
var SessionHistoryStore = require('../stores/sessionHistoryStore');

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

  parseDate: function(unformatted){
    var preFormat = new Date(unformatted);
    return preFormat.getMonth() + '/' + preFormat.getDate() + '/' + preFormat.getFullYear();
  },

  render: function(){
    var sessions = this.state.sessions.map(function(session, index){
      return (
        <tr key={ index }>
          <td>{ this.parseDate(session.createdAt) }</td>
          <td>{ session.first_name + ' ' + session.last_name }</td>
          <td>{ session.cust_name }</td>
          <td>{ session.cust_email }</td>
          <td>{ session.question }</td>
        </tr>
      );
    }.bind(this));

    return (
      <table className='table table-striped'>
        <caption className='log-title'>
          <h2>
            <span>Session History Log</span>
            <button type="button" className="refresh btn btn-default" onClick={ this.getEmployeeSessionData }>
              <span className="glyphicon glyphicon-refresh" aria-hidden="true"></span>
            </button>
          </h2>
        </caption>
        <thead>
          <tr>
            <th>Date</th>
            <th>Employee Name</th>
            <th>Customer Name</th>
            <th>Email</th>
            <th>Question</th>
          </tr>
        </thead>
        <tbody>
          { sessions }
        </tbody>
      </table>
    );
  }

});

module.exports = SessionHistory;
