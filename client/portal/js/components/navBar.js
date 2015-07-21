var React = require('react');

var NavBar = React.createClass({

  render: function() {
    return (
      <div>
        <div>Supportal</div>
        <div>User logged in as: {this.props.firstName} {this.props.lastName} </div>
        <div>{this.props.email}</div>
      </div>
    );
  }
});

module.exports = NavBar;
