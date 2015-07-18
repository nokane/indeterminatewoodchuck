var React = require('react');
var socketActions = require('../actions/socketActions');

var Queue = React.createClass({
  handleStaffReady: function(){
    // Need to pass down org name and send with staffReady
    socketActions.staffReady();
  },

  render: function(){
    return (
      <button onClick={ this.handleStaffReady }>This is the queue button</button>
    );
  }

});

module.exports = Queue;
