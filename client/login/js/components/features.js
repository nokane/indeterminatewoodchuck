var React = require('react');

var Features = React.createClass({

  render: function() {
    return (
      <div className='features'>
        <div className="row feat-row">
          <div className="column feat-column">
            <div className="img-icon">
              <img className="img-responsive" src="./assets/icons/needle_icon.png" alt="" />
            </div>
            <h3>Effective tool</h3>
            <span>
              Communicate with your customers in real time over high quality video
              and text chat
            </span>
          </div>
          <div className="column feat-column">
            <div className="img-icon">
              <img className="img-responsive" src="./assets/icons/needle_icon.png" alt="" />
            </div>
            <h3>Seamless integration</h3>
            <span>
              Integrate a support chat interface for your customers on your e-commerce
              website with 5 lines of code
            </span>
          </div>
        </div>
        <div className="row feat-row">
          <div className="column feat-column">
            <div className="img-icon">
              <img className="img-responsive" src="./assets/icons/needle_icon.png" alt="" />
            </div>
            <h3>Easy to Use</h3>
            <span>
              An intuitive support staff portal that allows representatives from your
              business to communicate with customers
            </span>
          </div>
          <div className="column feat-column">
            <div className="img-icon">
              <img className="img-responsive" src="./assets/icons/needle_icon.png" alt="" />
            </div>
            <h3>Flexible Styling</h3>
            <span>
              Free reign to style the support chat interface to follow the styling layout
              of your entire e-commerce business
            </span>
          </div>
        </div>
        <div className="row feat-row">
          <div className="column feat-column">
            <div className="img-icon">
              <img className="img-responsive" src="./assets/icons/needle_icon.png" alt="" />
            </div>
            <h3>EXAMPLE</h3>
            <span>
              Multiple customer chat interface mechanisms that you can use on your e-commerce
              website
            </span>
          </div>
          <div className="column feat-column">
            <div className="img-icon">
              <img className="img-responsive" src="./assets/icons/needle_icon.png" alt="" />
            </div>
            <h3>Historical support data</h3>
            <span>
              Access to historical information of all previous chat sessions that have
              occurred
            </span>
          </div>
        </div>

      </div>
    );
  }
});

module.exports = Features;
