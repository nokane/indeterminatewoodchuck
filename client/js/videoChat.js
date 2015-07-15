var VideoChat = React.createClass({
  componentDidMount: function(){
    this.setUpEventListeners();
  },

  setUpEventListeners: function(){
    comm.on('connected', function(peer) {
      document.getElementById('customerVideo').appendChild(peer.getVideo());
    });

    comm.on('local', function(peer) {
      console.log('local video started');
      localVideo.src = peer.stream;
      console.log('peer is this', peer);
      console.log(localVideo);
    });

    comm.on('disconnect', function(peer) {
      document.getElementById(peer.ID).remove();
    });
  },

  componentWillReceiveProps: function(nextProps){
    console.log('videoChat is receiving properties');
    comm.connect(nextProps.roomname, { audio: true });
  },

  render: function(){
    return (
      <div>
        This is the Video Chat Hooray Hooray Hooray!
        <video id='localVideo' autoPlay></video>
        <div id='customerVideo'></div>
      </div>
    );
  }
});

module.exports = VideoChat;

// this.props.roomname

// Order of operations in React
// 1. componentWillMount
// 2. render
// 3. componentDidMount
// 4. componentWillReceiveProps is called whenever there is a change to props.
// Used to react to a prop change before render is called
// 5. componentWillUnmount is invoked immediately beore a component is unmounted from the DOM
