var Queue = React.createClass({
  
  handleReady: function(){
    socket.emit('staffReady');
  },

  render: function(){
    return (
      <button onClick={ this.handleReady }>This is the queue button</button>
    );
  }

});

module.exports = Queue;
