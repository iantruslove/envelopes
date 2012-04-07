
// EnvelopesApp

var UsersView = require('./views/users_view').UsersView;
var UsersCollection = require('./users_collection').UsersCollection;

// Constructor
var EnvelopesApp = function() {
  if (!(this instanceof EnvelopesApp)) {
    return new EnvelopesApp();
  }

  // init method
  // returns this
  this.init = function( el ) {
    var usersCollection = new UsersCollection();

    var usersView = new UsersView({
      el: el, 
      collection: usersCollection
    });

    usersCollection.fetch({
      success: function(collection, response) {
        usersView.render();
      }
    });

    return this;
  };
};

exports.EnvelopesApp = EnvelopesApp;
