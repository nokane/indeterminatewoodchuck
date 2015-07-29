var AppDispatcher = require('../dispatchers/appDispatcher');
var appConstants = require('../constants/appConstants');
var apiUtil = require('./apiUtil');

var sessionActions = {
  getLogs: function(){
    apiUtil.getLogs().end(function(err, res){
      // TODO: handle errors
      // TODO: dispatch the new information
    });
  }
};

module.exports = sessionActions;
