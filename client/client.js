module.exports = function(app, express){
  var stitch  = require('stitch');
  var stitch_package = stitch.createPackage({
    paths: [__dirname + '/src']
  });

  app.configure(function() {
  });

  app.configure('development', function() {
    app.use("/", express.static(__dirname + '/static'));
    app.use("/script", express.static(__dirname + '/src'));
    app.use("/vendor", express.static(__dirname + '/vendor'));

    // dynamically compile all the javascript into a single file and serve on demand
    app.get("/script/app.js", stitch_package.createServer());
  });

  app.configure('production', function() {
    app.use("/", express.static(__dirname + '../build/www'));
  });
};
