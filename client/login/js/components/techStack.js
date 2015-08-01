var React = require('react');

var TechStack = React.createClass({

  render: function(){
    return (
      <div className="row">
        <div className="col-lg-12 text-center">
          <h2 className="heading">Tech Stack</h2>
          <hr className="primary divider"></hr>
        </div>

        <div className="row">
          <div className="col-xs-3 thumb vcenter">
            <a className="thumbnail" href="https://nodejs.org/">
              <img className="img-responsive" src="./assets/techStack/nodejs.png" alt="Node.js" />
            </a>
          </div>
          <div className="col-xs-3 thumb vcenter">
            <a className="thumbnail" href="http://expressjs.com/">
              <img className="img-responsive" src="./assets/techStack/express.png" alt="Express.js" />
            </a>
          </div>
          <div className="col-xs-3 thumb vcenter">
            <a className="thumbnail" href="http://www.postgresql.org/">
              <img className="img-responsive" src="./assets/techStack/postgres.png" alt="PostgreSQL" />
            </a>
          </div>
          <div className="col-xs-3 thumb vcenter">
            <a className="thumbnail" href="http://docs.sequelizejs.com/en/latest/">
              <img className="img-responsive" src="./assets/techStack/sequelize.png" alt="Sequelize" />
            </a>
          </div>
        </div>

        <div className="row">
          <div className="col-xs-3 thumb vcenter">
            <a className="thumbnail" href="http://socket.io/">
              <img className="img-responsive" src="./assets/techStack/socketio.png" alt="Socket.io" />
            </a>
          </div>
          <div className="col-xs-3 thumb vcenter">
            <a className="thumbnail" href="http://icecomm.io/">
              <img className="img-responsive" src="./assets/techStack/icecomm.png" alt="Icecomm" />
            </a>
          </div>
          <div className="col-xs-3 thumb vcenter">
            <a className="thumbnail" href="http://facebook.github.io/react/">
              <img className="img-responsive" src="./assets/techStack/react.png" alt="React.js" />
            </a>
          </div>
          <div className="col-xs-3 thumb vcenter">
            <a className="thumbnail" href="https://facebook.github.io/flux/">
              <img className="img-responsive" src="./assets/techStack/flux.png" alt="Flux.js" />
            </a>
          </div>
        </div>

        <div className="row">
          <div className="col-xs-3 thumb vcenter">
            <a className="thumbnail" href="http://mochajs.org/">
              <img className="img-responsive" src="./assets/techStack/mocha.png" alt="Mocha.js" />
            </a>
          </div>
          <div className="col-xs-3 thumb vcenter">
            <a className="thumbnail" href="http://gulpjs.com/">
              <img className="img-responsive" src="./assets/techStack/gulp.png" alt="Gulp.js" />
            </a>
          </div>
          <div className="col-xs-3 thumb vcenter">
            <a className="thumbnail" href="https://travis-ci.org/">
              <img className="img-responsive" src="./assets/techStack/travis.png" alt="TravisCI" />
            </a>
          </div>
          <div className="col-xs-3 thumb vcenter">
            <a className="thumbnail" href="https://www.heroku.com/">
              <img className="img-responsive" src="./assets/techStack/heroku.jpg" alt="Heroku" />
            </a>
          </div>
        </div>
      </div>
    );
  }

});

module.exports = TechStack;
