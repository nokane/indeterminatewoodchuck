var React = require('react');

var AboutHeader = React.createClass({

  render: function() {
    return (
      <div className='about-header'>
        <div className='header-text'>
          <div className='portalize-title'>
            <span>PORTALIZE</span>
          </div>
          <div className='title-caption'>
            <span>ADD VIDEO CHAT SUPPORT TO YOUR E-COMMERCE WEBSITE</span>
          </div>
        </div>
        <div className='about-images'>
        <span className='image-caption'>CONNECTING YOUR SUPPORT STAFF ...</span>
          <div className='div-portal-img'>
            <img className='portal-img' src='./assets/about/portal_side.png' alt='' />
          </div>
          <span className='image-caption'>TO YOUR CUSTOMERS WITH 3 LINES OF CODE</span>
          <div className='div-customer-img'>
            <img className='customer-img' src='./assets/about/customer_side.png' alt='' />
          </div>
        </div>
      </div>
    );
  }
});

module.exports = AboutHeader;
