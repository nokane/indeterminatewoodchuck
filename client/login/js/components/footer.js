var React = require('react');

var Footer = React.createClass({

  render: function(){
    return (
      <footer className="text-center">
        <div className="footer-above">
          <div className="container">
            <div className="row col-md-12">
              <div className="footer-col col-xs-4">
                <h3>Location</h3>
                <p>944 Market St.<br></br>San Francisco, CA 94102</p>
              </div>
              <div className="footer-col col-xs-4">
                <h3>Share Us</h3>
                <ul className="list-inline">
                  <li>
                    <a href="https://www.facebook.com/sharer/sharer.php?u=portalize.io" className="btn-social btn-outline">
                      <i className="fa fa-facebook fa-2x share"></i>
                    </a>
                  </li>
                  <li>
                    <a href="https://twitter.com/share?text=Portalize&url=portilize.io" className="btn-social btn-outline">
                      <i className="fa fa-twitter fa-2x share"></i>
                    </a>
                  </li>
                  <li>
                    <a href="https://plus.google.com/share?url=portalize.io" className="btn-social btn-outline">
                      <i className="fa fa-google-plus fa-2x share"></i>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="footer-col col-xs-4">
                <h3>Find Us On Github</h3>
                <ul className="list-inline">
                  <li>
                    <a href="https://github.com/indeterminatewoodchuck/indeterminatewoodchuck" className="btn-social btn-outline">
                      <i className="fa fa-github-alt fa-2x"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-below">
          <div className="container">
            <div className="row col-md-12">
              <div className="col-xs-12">
                Copyright &copy; Portalize 2015
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }

});

module.exports = Footer;
