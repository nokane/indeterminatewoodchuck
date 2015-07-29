var React = require('react');

/* [ { cust_name: 'first customer',
   cust_email: 'firstcustomer@gmail.com',
   createdAt: '2015-07-29T17:50:38.782Z',
   question: 'whatever',
   UserId: 1,
   name: 'Hack Reactor',
   first_name: 'John',
   last_name: 'Paulino',
   email: 'paulinoj@gmail.com',
   title: 'Software Engineer' }] */

var SessionLog = React.createClass({

  render: function(){
    console.log('These are the props: ', this.props);

    var sessions = this.props.sessions.map(function(session){
      return (
        <tr>
          <td>{ session.createdAt }</td>
          <td>{ session.UserId }</td>
          <td>{ session.first_name + ' ' + session.last_name }</td>
          <td>{ session.cust_name }</td>
          <td>{ session.cust_email }</td>
          <td>{ session.question }</td>
        </tr>
      );
    });

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

    return (
      <table className='table table-striped'>
        <caption>Session History Log</caption>
        <thead>
          <tr>
            <th>Time</th>
            <th>User ID</th>
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
