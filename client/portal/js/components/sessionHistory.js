var React = require('react');
var SessionLog = require('./sessionLog');

var SessionHistory = React.createClass({

  getInitialState: function(){
    return SessionHistoryStore.getState();
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

  getLogs: function(){
    sessionActions.getLogs();
  },

  render: function(){
    return (
      <div>
        <button type="button" className="refresh btn btn-default" onClick={ this.getLogs }>
          <span className="glyphicon glyphicon-refresh" aria-hidden="true"></span>
        </button>
      </div>
    );
  }

});

module.exports = SessionHistory;
