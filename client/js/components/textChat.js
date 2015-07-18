var React = require('react');
var textChatStore = require('../stores/textChatStore');
var icecommActions = require('../actions/icecommActions');

var TextChat = React.createClass({
  getInitialState: function() {
    return {
      messages: []
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
    });
  },

  handleSubmit: function(event) {
    event.preventDefault();
    icecommActions.sendTextMessage();
  },

  render: function() {
    return (
      <div>
        <div className='send-chat'>
          <form onSubmit={this.handleSubmit}>
            <input type='text' placeholder='Type your message here' />
            <input type='submit' />
          </form>
        </div>
        <div className='message-log'>
          
        </div>
      </div>
      )
  }
});

module.exports = TextChat;
