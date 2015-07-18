var app = require('./server/server.js');

if (process.env.PORT === undefined) {
  require('dotenv').load();
}

var port = process.env.PORT || 3000;

app.listen(port);
