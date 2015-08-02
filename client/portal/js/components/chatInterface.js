var React = require('react');
var VideoChat = require('./videoChat');
var Queue = require('./queue');
var TextChat = require('./textChat');
var CustomerDetails = require('./customerDetails');
var appStore = require('../stores/appStore');
var appActions = require('../actions/appActions');


var ChatInterface = React.createClass({
  render: function() {
    var web_name = this.props.web_name;
    var firstName = this.props.firstName;
    return (
      <div className='interface'>
        <div className='row'>
          <div className='column1'>
            <VideoChat />
          </div>
          <div className='column2'>
            <Queue web_name={web_name} />
          </div>
        </div>
        <div className='row'>
          <div className='column1'>
            <TextChat firstName={firstName}/>
          </div>
          <div className='column2'>
            <CustomerDetails />
          </div>
        </div>
    </div>
    );
  }
});

module.exports = ChatInterface;
