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
              <a className="thumbnail" href="https://nodejs.org/">
                <img className="img-responsive" src="./assets/techStack/nodejs.png" alt="" />
              </a>
            </div>
            <div className="col-lg-3 col-md-4 col-xs-6 thumb vcenter">
              <a className="thumbnail" href="http://expressjs.com/">
                <img className="img-responsive" src="./assets/techStack/express.png" alt="" />
              </a>
            </div>
            <div className="col-lg-3 col-md-4 col-xs-6 thumb vcenter">
              <a className="thumbnail" href="http://www.postgresql.org/">
                <img className="img-responsive" src="./assets/techStack/postgres.png" alt="" />
              </a>
            </div>
            <div className="col-lg-3 col-md-4 col-xs-6 thumb vcenter">
              <a className="thumbnail" href="http://docs.sequelizejs.com/en/latest/">
                <img className="img-responsive" src="./assets/techStack/sequelize.png" alt="" />
              </a>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-3 col-md-4 col-xs-6 thumb vcenter">
              <a className="thumbnail" href="http://socket.io/">
                <img className="img-responsive" src="./assets/techStack/socketio.png" alt="" />
              </a>
            </div>
            <div className="col-lg-3 col-md-4 col-xs-6 thumb vcenter">
              <a className="thumbnail" href="http://icecomm.io/">
                <img className="img-responsive" src="./assets/techStack/icecomm.png" alt="" />
              </a>
            </div>
            <div className="col-lg-3 col-md-4 col-xs-6 thumb vcenter">
              <a className="thumbnail" href="http://mochajs.org/">
                <img className="img-responsive" src="./assets/techStack/mocha.png" alt="" />
              </a>
            </div>
            <div className="col-lg-3 col-md-4 col-xs-6 thumb vcenter">
              <a className="thumbnail" href="https://www.heroku.com/">
                <img className="img-responsive" src="./assets/techStack/heroku.jpg" alt="" />
              </a>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-3 col-md-4 col-xs-6 thumb vcenter">
              <a className="thumbnail" href="https://travis-ci.org/">
                <img className="img-responsive" src="./assets/techStack/travis.png" alt="" />
              </a>
            </div>
            <div className="col-lg-3 col-md-4 col-xs-6 thumb vcenter">
              <a className="thumbnail" href="http://facebook.github.io/react/">
                <img className="img-responsive" src="./assets/techStack/react.png" alt="" />
              </a>
            </div>
            <div className="col-lg-3 col-md-4 col-xs-6 thumb vcenter">
              <a className="thumbnail" href="https://facebook.github.io/flux/">
                <img className="img-responsive" src="./assets/techStack/flux.png" alt="" />
              </a>
            </div>
            <div className="col-lg-3 col-md-4 col-xs-6 thumb vcenter">
              <a className="thumbnail" href="http://gulpjs.com/">
                <img className="img-responsive" src="./assets/techStack/gulp.png" alt="" />
              </a>
            </div>
          </div>
      </div>
    );
  }

});

module.exports = TechStack;
