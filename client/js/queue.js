var Queue = React.createClass({
  
  handleReady: function(){
    socket.emit('staffReady');
  },

  render: function(){
    return (
      <button onclick={ this.handleReady }></button>
    );
  }

});