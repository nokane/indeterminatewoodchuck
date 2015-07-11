var NavBar = require('NavBar');
var VideoChat = require('VideoChat');

var Main = React.createClass({
  render: function() {
    return (
      <div>
        <TopBar />
        <VideoChat />
      </div>
    );
  }
});

React.render(<Main />, document.getElementById('app'));
