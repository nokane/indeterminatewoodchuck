var jwt = require('jsonwebtoken');

module.exports = {

  checkAuth: function(req, res, next){
    console.log('You are trying to access a protected route.');
    var token = req.query.token;
    console.log('This is the token: ', token);


    if( token ){
      jwt.verify(token, 'disdasecretyo', function(err, decoded){
        if( err ){
          console.log('The token provided was invalid, redirecting to login.');
          res.redirect('/login');
          // return res.json({ success: false, message: 'Failed to authenticate token.' });
        } else {
          req.decoded = decoded; // if everything is good, then save to request for use in other routes
          console.log('Your token is good to go. You may access protected assets.');
          next();
        }
      });
    } else { // if there is no token then return an error
      // return res.status(403).send({ success: false, message: 'No token provided' });
      console.log('No token provided, redirecting to login.');
      res.redirect('/login');
    }
  },

  createToken: function(user, res){
    var token = jwt.sign(user, 'disdasecretyo', { expiresInMinutes: 20 });
    res.json({ success: "true", message: 'Enjoy your token!', token: token });
  }
  // errorLogger: function(err, req, res, next){
  //   // log the error then send it to the next middleware in
  //   // middleware.js
  //   console.err(err.stack);
  //   next(err);
  // },
  //
  // errorHandler: function(err, req, res, next){
  //   // log the error then send it to the next middleware in
  //   // middleware.js
  //   console.error(err.stack);
  //   next(err);
  // }

};
