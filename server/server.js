module.exports = function(app, express) {
  require('express-resource');

  var user = require('./RestResources/UserResource.js'),
      comment = require('./RestResources/CommentResource.js'),
      envelope = require('./RestResources/EnvelopeResource.js');

  app.configure(function(){
    app.use(express.bodyParser());

    app.resource('api/comment', comment);
    app.resource('api/user', user);
    app.resource('api/envelope', envelope);
  });
};
