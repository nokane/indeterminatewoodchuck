var React = require('react');
var queueStore = require('../stores/queueStore');
var socketActions = require('../actions/socketActions');

var Queue = React.createClass({
  getInitialState: function() {
    return queueStore.getState();
  },

  componentDidMount: function(){
    queueStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function(){
    queueStore.removeChangeListener(this._onChange);    
  },

  _onChange: function() {
    this.setState(queueStore.getState());
  },

  handleStaffReady: function(){
    var orgName = this.props.orgName;
    socketActions.staffReady(orgName);
  },

  render: function(){
    var customerQueue = this.state.customerQueue;

    var customerCount = <div>There are {customerQueue.length} users in the queue.</div>;

    var queuedCustomers = this.state.customerQueue.map(function(customerId, index) {
      return (<div>Customer {index}: {customerId}</div>);
    });

    return (
      <div>
        <div>
          {customerCount}
          {queuedCustomers}
        </div>
        <button onClick={ this.handleStaffReady }>Chat with next user</button>
      </div>
    );
  }

});

module.exports = Queue;
