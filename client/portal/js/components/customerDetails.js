var React = require('react');
var customerDetailsStore = require('../stores/customerDetailsStore');

var CustomerDetails = React.createClass({
  getInitialState: function(){
    return customerDetailsStore.getState();
  },

  componentDidMount: function(){
    customerDetailsStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function(){
    customerDetailsStore.removeChangeListener(this._onChange);    
  },

  _onChange: function() {
    this.setState(customerDetailsStore.getState());
  },

  render: function(){
    return (
        <div className='customerDetails'>
          <h7>Current Customer Details:</h7>
          <div>Name: {this.state.name}</div>
          <div>Email: {this.state.email}</div>
          <div>Question: {this.state.question}</div>
        </div>
    );
  }
});

module.exports = CustomerDetails;

