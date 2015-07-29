var React = require('react');

var SessionLog = React.createClass({

  getInitialState: function(){
    return {
      sessions: [
        { time: '2:00 PM', employeeName: 'Batman', roomName: 'Arkham City', customerName: 'Naruto', email: 'naruto@sasuke.com', question: 'wahhhh??' },
        { time: '2:00 PM', employeeName: 'Batman', roomName: 'Arkham City', customerName: 'Naruto', email: 'naruto@sasuke.com', question: 'wahhhh??' },
        { time: '2:00 PM', employeeName: 'Batman', roomName: 'Arkham City', customerName: 'Naruto', email: 'naruto@sasuke.com', question: 'wahhhh??' }
      ]
    };

  },



  render: function(){
    var sessions = this.state.sessions.map(function(session){
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
        <caption>Session History Log</caption>
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
