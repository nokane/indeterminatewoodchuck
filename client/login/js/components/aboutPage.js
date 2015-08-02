var React = require('react');
var About = require('./about');
var TechStack = require('./techStack');
var Intro = require('./intro.js');
var Features = require('./features.js');
var AboutHeader = require('./aboutHeader');

var AboutPage = React.createClass({

  render: function() {
    return (
      <div>
        <AboutHeader />
        <hr className="primary"></hr>
        <Intro />
        <hr className="primary"></hr>
        <Features />
        <hr className="primary"></hr>
        <TechStack />
        <hr className="primary"></hr>
        <About />
      </div>
    )
  }
});

module.exports = AboutPage;
