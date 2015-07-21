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
    return appStore.getState();
  },

  componentDidMount: function(){
    appStore.addChangeListener(this._onChange);
    this.getEmployeeData();
  },

  componentWillUnmount: function() {
    appStore.removeChangeListener(this._onChange);    
  },

  getEmployeeData: function() {
    // Could check local storage first?
    appActions.getEmployeeData();
  },

  _onChange: function() {
    this.setState(appStore.getState());
  },

  render: function() {
    return (
      <div>
        <NavBar />
        <VideoChat />
        <Queue orgName={ this.state.orgName } />
        <TextChat />
      </div>
    );
  }
});

React.render(<Main />, document.getElementById('app'));
