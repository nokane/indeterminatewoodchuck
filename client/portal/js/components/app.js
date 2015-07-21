var React = require('react');
var NavBar = require('./navBar');
var VideoChat = require('./videoChat');
var Queue = require('./queue');
var TextChat = require('./textChat');
var appStore = require('../stores/appStore');
var appActions = require('../actions/appActions');

var Main = React.createClass({

  // Ask server for org name, employee name / ID, other employee info

  getInitialState: function(){
    return { 
      roomname: appStore.getRoom()
    };
  },

  componentDidMount: function(){
    appStore.addRoomChangeListener(this._onRoomChange);
  },

  componentWillUnmount: function() {
    appStore.removeRoomChangeListener(this._onRoomChange);    
  },

  _onRoomChange: function() {
    this.setState({
      roomname: appStore.getRoom()
    });
  },

  render: function() {
    return (
      <div>
        <NavBar />
        <VideoChat />
        <Queue />
        <TextChat />
      </div>
    );
  }
});

React.render(<Main />, document.getElementById('app'));
