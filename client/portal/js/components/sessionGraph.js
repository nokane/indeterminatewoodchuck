var React = require('react');

var SessionGraph = React.createClass({

  render: function(){
    var sessions = this.props.sessions;
    return (
      <div className="graphs"></div>
    )
  }

});

module.exports = SessionGraph;
