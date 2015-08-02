var morgan = require('morgan');
var bodyParser = require('body-parser');
var helpers = require('./helpers.js');
var cookieParser = require('cookie-parser');
var favicon = require('serve-favicon');

module.exports = function(app, express, server, io){

  var userRouter = express.Router(); // user sign-in and user sign-out
  var employeeDataRouter = express.Router(); // api for employee data

  // url encoding, json parser, and terminal logs
  app.use(favicon(__dirname + '/../../favicon.ico'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(morgan('dev'));

  app.use(cookieParser());

  // unprotected static routes
  app.use('/librarystyles', express.static(__dirname + '/../../library/styles.css'));
  app.use('/library', express.static(__dirname + '/../../library/chatLibrary.js'));
  app.use(express.static(__dirname + '/../../client/dist/login'));

  // unprotected api routes
  app.use('/api/users', userRouter);
  require('../routes/userRoutes.js')(userRouter);

  // protected api routes
  app.use('/api/employeeData', employeeDataRouter);
  employeeDataRouter.use(helpers.checkAuth);
  require('../routes/employeeDataRoutes.js')(employeeDataRouter);

  var unless = function(path, middleware) {
    return function(req, res, next) {
      for( var i = 0; i < path.length; i++ ){
        if (path[i] === req.path) {
          return next();
        }
      }
      return middleware(req, res, next);
    };
  };

  /* ----------PROTECTED ROUTES---------- */
  app.use(unless(['/src/build.js', 'build/build.min.js'], helpers.checkAuth));
  app.use('/portal', express.static(__dirname + '/../../client/dist/portal'));
  // app.use(helpers.errorLogger);
  // app.use(helpers.errorHandler);
  /* ----------PROTECTED ROUTES---------- */

  server.socketroute = require('./socketroute.js');
  io.on('connection', function(socket) {
    server.socketroute.socketroute(io, socket);
  });

};
