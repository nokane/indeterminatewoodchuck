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
                        <p>3481 Melrose Place<br></br>Beverly Hills, CA 90210</p>
                    </div>
                    <div className="footer-col col-xs-4">
                        <h3>Around the Web</h3>
                        <ul className="list-inline">
                            <li>
                                <a href="#" className="btn-social btn-outline"><i className="fa fa-fw fa-facebook"></i></a>
                            </li>
                            <li>
                                <a href="#" className="btn-social btn-outline"><i className="fa fa-fw fa-google-plus"></i></a>
                            </li>
                            <li>
                                <a href="#" className="btn-social btn-outline"><i className="fa fa-fw fa-twitter"></i></a>
                            </li>
                            <li>
                                <a href="#" className="btn-social btn-outline"><i className="fa fa-fw fa-linkedin"></i></a>
                            </li>
                            <li>
                                <a href="#" className="btn-social btn-outline"><i className="fa fa-fw fa-dribbble"></i></a>
                            </li>
                        </ul>
                    </div>
                    <div className="footer-col col-xs-4">
                        <h3>About Freelancer</h3>
                        <p>Freelance is a free to use, open source Bootstrap theme created by <a href="http://startbootstrap.com">Start Bootstrap</a>.</p>
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
