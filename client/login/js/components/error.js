var React = require('react');
var helper = require('./helper.js');

// Component for showing errors
 
var Error = React.createClass({
  render: function() {
    return (
      <div>
        <div className='errorView red-box'>Error:  {this.props.errorMessage}</div>
      </div>
    )
  }
});

module.exports = Error;
