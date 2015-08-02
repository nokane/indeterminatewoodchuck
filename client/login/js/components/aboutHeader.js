var React = require('react');

var AboutHeader = React.createClass({

  render: function() {
    return (
      <div className='about-header'>

        <img className='portal-img' src='./assets/about/portal_side.png' alt='' />
        <img className='customer-img' src='./assets/about/customer_side.png' alt='' />
      </div>
    );
  }
});

module.exports = AboutHeader;
