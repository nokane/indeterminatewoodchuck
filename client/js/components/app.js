var React = require('react');
var NavBar = require('./navBar');
var VideoChat = require('./videoChat');
var Queue = require('./queue');
var appStore = require('../stores/appStore');
var appActions = require('../actions/appActions');

var Main = React.createClass({

  getInitialState: function(){
    return { 
      roomname: appStore.getRoom()
    };
  },

  componentWillMount: function(){
    appActions.startSocketListener();
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
