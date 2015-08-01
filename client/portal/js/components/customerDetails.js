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
        <div className='customerDetailsBox'>
          <h4 className='queue-count'>Current Customer Details:</h4>
          <div className='customerDetails'>
            <div><strong>Customer</strong>: {this.state.name}</div>
            <div><strong>Email: </strong>{this.state.email}</div>
            <div><strong>Request: </strong>{this.state.question}</div>
          </div>
        </div>
    );
  }
});

module.exports = CustomerDetails;

