
// users_view.js //

var UserShowView = require('./user_show_view').UserShowView,
    UserAddView = require('./user_add_view').UserAddView,
    UserView = require('./user_view').UserView,
    UsersView;

var UsersView = Backbone.View.extend({

  templates: {
    outline: _.template(
               '<h2>Users</h2>' + 
               '<div class="users_container"></div>' + 
               '<div class="add_user_container"></div>')
  },

  initialize: function() {
    this.collection.on("add", _.bind(this.addNewUserToView, this));
  },

  addNewUserToView: function(model) {
    var userView = new UserView({model: model}).render();
    this.$el.find('.users_container').append(userView.render().el);
  },

  render: function() {
    // TODO: avoid multiple DOM manipulations - very slow
    this.$el.empty();
    var UserView = require('./user_view').UserView;

    this.$el.html(this.templates.outline());
    var usersDiv = this.$el.find('.users_container');

    this.collection.each(_.bind(function(model) {
      var userView = new UserView({model: model});
      usersDiv.append(userView.render().el);
    }, this));

    var userAddView = new UserAddView({
      collection: this.collection,
      el: this.$el.find('.add_user_container')
    }).render();

    return this;
  },


});

exports.UsersView = UsersView;

