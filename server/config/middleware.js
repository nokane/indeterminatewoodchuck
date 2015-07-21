var morgan = require('morgan');
var bodyParser = require('body-parser');
var helpers = require('./helpers.js');

module.exports = function(app, express, server, io){

  var userRouter = express.Router(); // user sign-in and user sign-out

  // url encoding, json parser, and terminal logs
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(morgan('dev'));

  // unprotected static routes
  app.use('/library', express.static(__dirname + '/../../library/chatLibrary.js'));
  app.use('/login', express.static(__dirname + '/../../client/dist/login'));

  // unprotected api routes
  app.use('/api/users', userRouter);
  require('../routes/userRoutes.js')(userRouter);

  var unless = function(path, middleware) {
    return function(req, res, next) {
        if (path === req.path) {
            return next();
        } else {
            return middleware(req, res, next);
        }
    };
  };

  /* ----------PROTECTED ROUTES---------- */
  app.use(unless('/build/build.min.js', helpers.checkAuth));
  app.use(express.static(__dirname + '/../../client/dist/portal'));
  // app.use(helpers.errorLogger);
  // app.use(helpers.errorHandler);
  /* ----------PROTECTED ROUTES---------- */

  server.socketroute = require('./socketroute.js');
  io.on('connection', function(socket) {
    server.socketroute.socketroute(io, socket);
  });

};
