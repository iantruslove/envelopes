var express = require('express');
var app = module.exports = express.createServer();

// top-level app setup
app.configure(function() {
});

app.configure('development', function() {
  app.use(express.errorHandler({
    dumpExceptions: true,
    showStack: true
  }));
});

app.configure('production', function() {
  app.use(express.logger());
  app.use(express.errorHandler());
});

// Client and Server pieces
require('./server/server.js')(app, express);
require('./client/client.js')(app, express);

var port = 3000;
app.listen(port);
console.log("Server running on port " + port);
