var React = require('react');
var textChatStore = require('../stores/textChatStore');
var icecommActions = require('../actions/icecommActions');

var TextChat = React.createClass({
  getInitialState: function() {
    return textChatStore.getState();
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
    this.setState(textChatStore.getState());
  },

  onKeyDown: function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      var message = {
        user: this.props.firstName,
        text: React.findDOMNode(this.refs.messageInput).value
      };
      icecommActions.sendTextMessage(message);
      React.findDOMNode(this.refs.messageInput).value = '';
    }
  },

  handleSubmit: function(event) {
    event.preventDefault();
    var message = {
      user: this.props.firstName,
      text: event.target[0].value
    };
    icecommActions.sendTextMessage(message);
    React.findDOMNode(this.refs.messageInput).value = '';
  },

  render: function() {
    var messages = this.state.messages.map(function(message, index) {
      var user = message[0];
      var text = message[1];
      return (<div key={index}><span className='userPrompt'>{user}</span>: {text}</div>);
    });

    var disabledInput = <input className='form-control' ref='messageInput' type='text' value='' placeholder='Type your message here' disabled />;
    var disabledButton = <button className='btn btn-primary' type='submit' disabled>Submit</button>;
    var input = <input className='form-control' ref='messageInput' onKeyDown={this.onKeyDown} type='text' placeholder='Type your message here' required/>;
    var button = <button className='btn btn-primary' type='submit'>Submit</button>;

    return (
      <div>
        <div className='message-log' ref='messageLog' >
          {messages}
        </div>
        <form className='send-chat form-group' onSubmit={this.handleSubmit}>
          <div className='input-group'>
            { this.state.connected ? input : disabledInput }
            <span className='input-group-btn'>
              { this.state.connected ? button : disabledButton }
            </span>
          </div>
        </form>
      </div>
      );
  }
});

module.exports = TextChat;
