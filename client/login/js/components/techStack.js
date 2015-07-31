var React = require('react');

var TechStack = React.createClass({

  render: function(){
    return (
      <div className="row">

          <div className="col-lg-12 text-center">
              <h2 className="heading">Tech Stack</h2>
              <hr className="primary"></hr>
          </div>

          <div className="row">
            <div className="col-lg-3 col-md-4 col-xs-6 thumb vcenter">
              <a className="thumbnail" href="#">
                <img className="img-responsive" src="./assets/techStack/nodejs.png" alt="" />
              </a>
            </div>
            <div className="col-lg-3 col-md-4 col-xs-6 thumb vcenter">
              <a className="thumbnail" href="#">
                <img className="img-responsive" src="./assets/techStack/express.png" alt="" />
              </a>
            </div>
            <div className="col-lg-3 col-md-4 col-xs-6 thumb vcenter">
              <a className="thumbnail" href="#">
                <img className="img-responsive" src="./assets/techStack/postgres.png" alt="" />
              </a>
            </div>
            <div className="col-lg-3 col-md-4 col-xs-6 thumb vcenter">
              <a className="thumbnail" href="#">
                <img className="img-responsive" src="./assets/techStack/sequelize.png" alt="" />
              </a>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-3 col-md-4 col-xs-6 thumb vcenter">
              <a className="thumbnail" href="#">
                <img className="img-responsive" src="./assets/techStack/socketio.png" alt="" />
              </a>
            </div>
            <div className="col-lg-3 col-md-4 col-xs-6 thumb vcenter">
              <a className="thumbnail" href="#">
                <img className="img-responsive" src="./assets/techStack/icecomm.png" alt="" />
              </a>
            </div>
            <div className="col-lg-3 col-md-4 col-xs-6 thumb vcenter">
              <a className="thumbnail" href="#">
                <img className="img-responsive" src="./assets/techStack/mocha.png" alt="" />
              </a>
            </div>
            <div className="col-lg-3 col-md-4 col-xs-6 thumb vcenter">
              <a className="thumbnail" href="#">
                <img className="img-responsive" src="./assets/techStack/heroku.png" alt="" />
              </a>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-3 col-md-4 col-xs-6 thumb vcenter">
              <a className="thumbnail" href="#">
                <img className="img-responsive" src="./assets/techStack/travis.png" alt="" />
              </a>
            </div>
            <div className="col-lg-3 col-md-4 col-xs-6 thumb vcenter">
              <a className="thumbnail" href="#">
                <img className="img-responsive" src="./assets/techStack/react-flux.png" alt="" />
              </a>
            </div>
            <div className="col-lg-3 col-md-4 col-xs-6 thumb vcenter">
              <a className="thumbnail" href="#">
                <img className="img-responsive" src="./assets/techStack/github.png" alt="" />
              </a>
            </div>
            <div className="col-lg-3 col-md-4 col-xs-6 thumb vcenter">
              <a className="thumbnail" href="#">
                <img className="img-responsive" src="./assets/techStack/gulp.jpg" alt="" />
              </a>
            </div>
          </div>
      </div>
    );
  }

});

module.exports = TechStack;
