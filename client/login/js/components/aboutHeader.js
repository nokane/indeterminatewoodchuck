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
            <span>THE DIRECT LINK BETWEEN YOUR SUPPORT STAFF AND CUSTOMERS</span>
          </div>
        </div>
        <div className='about-images'>
          <div className='div-portal-img'>
            <img className='portal-img' src='./assets/about/portal_side.png' alt='' />
          </div>
          <div className='div-customer-img'>
            <img className='customer-img' src='./assets/about/customer_side.png' alt='' />
          </div>
        </div>
      </div>
    );
  }
});

module.exports = AboutHeader;
