var React = require('react');
var VideoChat = require('./videoChat');
var Queue = require('./queue');
var TextChat = require('./textChat');
var appStore = require('../stores/appStore');
var appActions = require('../actions/appActions');


var ChatInterface = React.createClass({
  render: function() {

    return (
      <div>
        <div className='row'>
          <div className='column1'>
            <VideoChat />
          </div>
          <div className='column2'>
            <Queue web_name={web_name} />
          </div>
        </div>
        <div className='row'>
          <TextChat />
        </div>
    </div>
    );
  }
});

module.exports = ChatInterface;
