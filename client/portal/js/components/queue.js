var React = require('react');
var socketActions = require('../actions/socketActions');

var Queue = React.createClass({
  handleStaffReady: function(){
    var roomName = this.props.roomName;
    socketActions.staffReady(roomName);
  },

  render: function(){
    return (
      <button onClick={ this.handleStaffReady }>This is the queue button</button>
    );
  }

});

module.exports = Queue;
