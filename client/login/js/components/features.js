var React = require('react');

var Features = React.createClass({

  render: function() {
    return (
      <div className='features'>
        <div className="row feat-row">
          <div className="column feat-column">
            <div className="img-icon">
              <img className="img-responsive" src="./assets/icons/video_icon.png" alt="" />
            </div>
            <div className="feat-text">
              <h3>High Quality Video</h3>
              <span>
                Communicate with your customers in real time over high quality video
                and text chat
              </span>
            </div>
          </div>
          <div className="column feat-column">
            <div className="img-icon">
              <img className="img-responsive" src="./assets/icons/needle_icon.png" alt="" />
            </div>
            <div className="feat-text">
              <h3>Seamless Integration</h3>
              <span>
                Integrate a support chat interface for your customers on your e-commerce
                website with 3 lines of code
              </span>
            </div>
          </div>
        </div>
        <div className="row feat-row">
          <div className="column feat-column">
            <div className="img-icon">
              <img className="img-responsive" src="./assets/icons/computer_icon.png" alt="" />
            </div>
            <div className="feat-text">
              <h3>Support Staff Portal</h3>
              <span>
                An intuitive support staff portal that allows representatives from your
                business to communicate with customers
              </span>
            </div>
          </div>
          <div className="column feat-column">
            <div className="img-icon">
              <img className="img-responsive" src="./assets/icons/brush_icon.png" alt="" />
            </div>
            <div className="feat-text">
              <h3>Flexible Styling</h3>
              <span>
                Free reign to style the support chat interface to follow the styling layout
                of your entire e-commerce business
              </span>
            </div>
          </div>
        </div>
        <div className="row feat-row">
          <div className="column feat-column">
            <div className="img-icon">
              <img className="img-responsive" src="./assets/icons/customer_icon.png" alt="" />
            </div>
            <div className="feat-text">
              <h3>Efficient Customer Queueing</h3>
              <span>
                Robust queueing system allocates your support staff resources efficiently to
                minimize customer wait time
              </span>
            </div>
          </div>
          <div className="column feat-column">
            <div className="img-icon">
              <img className="img-responsive" src="./assets/icons/document_icon.png" alt="" />
            </div>
            <div className="feat-text">
            <h3>Historical Support Data</h3>
              <span>
                Access to historical data of all previous customer support chat sessions
              </span>
            </div>
          </div>
        </div>

      </div>
    );
  }
});

module.exports = Features;
