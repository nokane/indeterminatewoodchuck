var React = require('react');
var customerDetailsStore = require('../stores/customerDetailsStore');
var VideoElement = require('./videoElement.js');

var CustomerDetails = React.createClass({
  getInitialState: function(){
    return { 
      localStream: null,
      remoteStream: null
    };
  },

  componentDidMount: function(){
    customerDetailsStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function(){
    customerDetailsStore.removeChangeListener(this._onChange);    
  },

  _onChange: function() {
    this.setState({
      localStream: customerDetailsStore.getLocalStream(),
      remoteStream: customerDetailsStore.getRemoteStream()
    });
  },

  render: function(){
    return (
        <div id='remoteStreamVideo'>
          {this.state.remoteStream ? <VideoElement key='remoteStream' value={this.state.remoteStream} size="640" /> : 
          <div></div>}
          <div id='localStreamVideo'>
            {this.state.localStream ? <VideoElement key='localStream' value={this.state.localStream} size="160" /> :
            <div></div>}
          </div>
        </div>
    )
  }
});

module.exports = CustomerDetails;

