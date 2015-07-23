var React = require('react');

var VideoElement = React.createClass({

  render: function(){
    console.log("DO WE GET HERE");
    console.log(this.props.stream);
    return (
      <div>
        <video id={this.props.key} key={this.props.value.ID}
              src={this.props.value.stream} width={this.props.size} autoPlay />
      </div>
    );
  }
});

module.exports = VideoElement;
