var UsersCollection = Backbone.Collection.extend({
  url: '/api/user'
});

exports.UsersCollection = UsersCollection;
