var express = require('express'),
  Resource = require('express-resource'),
  user = require('./RestResources/UserResource.js'),
  comment = require('./RestResources/CommentResource.js'),
  envelope = require('./RestResources/EnvelopeResource.js');

var app = express.createServer();
app.use(express.logger());
app.use(express.bodyParser());
app.use("/html", express.static(__dirname + '/client/src'));

app.resource('api/comment', comment);
app.resource('api/user', user);
app.resource('api/envelope', envelope);

var port = 3000;
app.listen(port);
console.log("Server running on port " + port);
