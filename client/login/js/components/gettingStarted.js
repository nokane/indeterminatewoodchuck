var React           = require('react');
var assign          = require('object-assign');

var AboutPage = React.createClass({

  render: function() {
    return (
      <div className = 'aboutSection'>
        <div className='view'>

          <div className='column'>
            <div className='column-left'>
              THIS IS THE GETTING STARTED PAGE    
            </div>
          </div>

          <div className='column'>
            <div className='column-right'>
              THIS IS THE GETTING STARTED PAGE
            </div> 
          </div>
        </div>
      </div>
    )
  }
});

module.exports = AboutPage;
