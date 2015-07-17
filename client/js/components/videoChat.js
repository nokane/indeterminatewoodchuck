var React = require('react');

var VideoChat = React.createClass({
  componentDidMount: function(){

  },

  setUpEventListeners: function(){

  },

  componentWillReceiveProps: function(nextProps){

  },

  render: function(){
    return (
      <div>
        This is the Video Chat Hooray Hooray Hooray!
        <video id='localVideo' autoPlay></video>
        <div id='customerVideo'></div>
      </div>
    );
  }
});

module.exports = VideoChat;

// Order of operations in React
// 1. componentWillMount
// 2. render
// 3. componentDidMount
// 4. componentWillReceiveProps is called whenever there is a change to props.
// Used to react to a prop change before render is called
// 5. componentWillUnmount is invoked immediately beore a component is unmounted from the DOM
