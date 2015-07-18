var React = require('react');
var textChatStore = require('../stores/textChatStore');

var TextChat = React.createClass({
  getInitialState: function() {
    return {
      messages: [];
    }
  },

  componentDidMount: function(){
    textChatStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function(){
    textChatStore.removeChangeListener(this._onChange);    
  },

  _onChange: function() {
    this.setState({
      messages: textChatStore.getMessages()
    })
  },

  render: function() {
    return (
      <div className='send-chat'>
        <form>
          <input type='text' placeholder='Type your message here'>
          <input type='submit'>
        </form>
      </div>
      <div className='message-log'>

      </div>
      )
  }
});

module.exports = TextChat;
