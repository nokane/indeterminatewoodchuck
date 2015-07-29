var React = require('react');
var sessionActions = require('../actions/sessionActions');
var SessionHistoryStore = require('../stores/sessionHistoryStore');
var SessionLog = require('./sessionLog');
var SessionGraph = require('./sessionGraph');

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
        <SessionGraph />
        <SessionLog sessions={ this.state.sessions } />
      </div>
    );
  }

});

module.exports = SessionHistory;
