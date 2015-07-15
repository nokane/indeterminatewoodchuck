var NavBar = require('./navBar');
var VideoChat = require('./videoChat');
var Queue = require('./queue');

var Main = React.createClass({

  getInitialState: function(){
    return { roomname: 'room_lky' };
  },

  componentDidMount: function(){
    this.setUpEventListeners();
  },

  setUpEventListeners: function(){
    socket.on('staffRoom', function(msg) {
      console.log('this is the room name', msg);
      this.setState({ roomname: msg });
    }.bind(this));
  },

  render: function() {
    return (
      <div>
        <NavBar />
        <VideoChat roomname={ this.state.roomname } />
        <Queue />
      </div>
    );
  }
});

React.render(<Main />, document.getElementById('app'));
