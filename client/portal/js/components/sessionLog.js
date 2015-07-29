var React = require('react');
var SessionHistoryStore = require('../stores/sessionHistoryStore');
var sessionActions = require('../actions/sessionActions');


var SessionLog = React.createClass({

  render: function(){
    var sessions = this.props.sessions.map(function(session){
      return (
        <tr>
          <td>{ session.time }</td>
          <td>{ session.employeeName }</td>
          <td>{ session.roomName }</td>
          <td>{ session.customerName }</td>
          <td>{ session.email }</td>
          <td>{ session.question }</td>
        </tr>
      );
    });

    return (
      <table className='table table-striped'>
        <caption>
          <button type="button" className="refresh btn btn-default" onClick={ this.getLogs }>
            <span className="glyphicon glyphicon-refresh" aria-hidden="true"></span>
          </button>
          <span>Session History Log</span>
        </caption>
        <thead>
          <tr>
            <th>Time</th><th>Employee Name</th><th>Room Name</th><th>Customer Name</th><th>Email</th><th>Question</th>
          </tr>
        </thead>
        <tbody>
          { sessions }
        </tbody>
      </table>
    );
  }

});

module.exports = SessionLog;
