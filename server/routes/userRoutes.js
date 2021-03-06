var userController = require('../controllers/userController.js');

module.exports = function(app){ // app is userRouter injected from middleware.js
  app.post('/signin', userController.signin);
  app.post('/signup', userController.signup);
  app.post('/signupwithorg', userController.signupwithorg);
  app.post('/logout', userController.logout);
};
