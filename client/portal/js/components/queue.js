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
    return (
      <div>
        <div>

        </div>
        <button onClick={ this.handleStaffReady }>This is the queue button</button>
      </div>
    );
  }

});

module.exports = Queue;
