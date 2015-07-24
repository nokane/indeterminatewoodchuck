var React = require('react');
var textChatStore = require('../stores/textChatStore');
var icecommActions = require('../actions/icecommActions');

var TextChat = React.createClass({
  getInitialState: function() {
    return {
      messages: []
    };
  },

  componentDidMount: function(){
    textChatStore.addChangeListener(this._onChange);
  },

  componentDidUpdate: function() {
    var node = React.findDOMNode(this.refs.messageLog);
    node.scrollTop = node.scrollHeight;
  },

  componentWillUnmount: function(){
    textChatStore.removeChangeListener(this._onChange);    
  },

  _onChange: function() {
    this.setState({
      messages: textChatStore.getMessages()
    });
  },

  onKeyDown: function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      var message = React.findDOMNode(this.refs.messageInput).value;
      icecommActions.sendTextMessage(message);
      React.findDOMNode(this.refs.messageInput).value = '';
    }
  },

  handleSubmit: function(event) {
    event.preventDefault();
    var message = event.target[0].value;
    icecommActions.sendTextMessage(message);
    React.findDOMNode(this.refs.messageInput).value = '';
  },

  render: function() {
    var messages = this.state.messages.map(function(message, index) {
      var user = message[0];
      var text = message[1];
      return (<div key={index}><span className='userPrompt'>{user}</span>: {text}</div>);
    });

    return (
      <div>
        <div className='message-log' ref='messageLog' >
          {messages}
        </div>
        <div className='send-chat'>
          <form onSubmit={this.handleSubmit}>
            <textarea className='chat-box' ref='messageInput' onKeyDown={this.onKeyDown} type='text' placeholder='Type your message here' />
            <input className='submit' type='submit' />
          </form>
        </div>
      </div>
      );
  }
});

module.exports = TextChat;
