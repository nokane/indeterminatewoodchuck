var React = require('react');

var SessionLog = React.createClass({

  parseDate: function(unformatted){
    var preFormat = new Date(unformatted);
    var hours = preFormat.getHours();
    var preformatMinutes = preFormat.getMinutes().toString();
    var minutes = preformatMinutes.length === 1 ? '0' + preformatMinutes : preformatMinutes;
    var formattedTime = hours < 12 ?
                        hours + ':' + minutes + ' A.M.' :
                        (hours - 12) + ':' + minutes + ' P.M.';

    return preFormat.getMonth() + '/' + preFormat.getDate() + '/' + preFormat.getFullYear() +
           ', ' + formattedTime;
  },

  render: function(){

    var sessions = this.props.sessions.map(function(session, index){
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
        <caption>Session History Log</caption>
        <thead>
          <tr>
            <th>Date/Time</th>
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

module.exports = SessionLog;
