var React = require('react');

var Intro = React.createClass({

  render: function() {
    return (
      <div className='intro-text row'>
        <span>
          Portalize is a customer support platform that enables e-commerce businesses to
          utilize video chat on their websites, providing a means to communicate face to face with
          customers. With just a few lines of code from the Portalize JavaScript library, businesses
          are able to add a customer side video chat interface to their website. In addition, 
          Portalize provides support staff with a portal to interact with their customers. Our service makes it easy
          for businesses to provide live customer support, improving their customers' shopping experience.
        </span>
      </div>
    );
  }
});

module.exports = Intro;
