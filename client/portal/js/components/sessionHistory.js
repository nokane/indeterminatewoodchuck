var React = require('react');
var SessionLog = require('./sessionLog');

var SessionHistory = React.createClass({

  render: function(){
    return (
      <div>
        <SessionLog />
      </div>
    );
  }

});

module.exports = SessionHistory;
