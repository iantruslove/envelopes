var UserShowView = require('./user_show_view').UserShowView,
    UserEditView = require('./user_edit_view').UserEditView,
    UserView;

UserView = Backbone.View.extend({

  className: "user_view", 

  template: _.template(
              '<div class="user_show_view"></div>'+
              '<div class="user_edit_view"></div>'
              ),
  events: {
    "click .user_edit_view .cancel" : "onCancelEdit",
    "click .user_edit_view .save" : "onSave",
    "click .user_show_view .edit" : "onEdit"
  },

  setMode: function(mode) {
    if (mode === 'edit') {
      this.$el.find('.user_edit_view').show('fast');
      this.$el.find('.user_show_view').hide('fast');
    } else if (mode === 'show') {
      this.$el.find('.user_edit_view').hide('fast');
      this.$el.find('.user_show_view').show('fast');
    }
  }, 

  onCancelEdit: function() {
    this.setMode('show');
  },

  onSave: function () {
    this.setMode('show');
  },

  onEdit: function() {
    this.setMode('edit');
  },

  initialize: function () {
    this.userShowView = new UserShowView({model: this.model});
    this.userEditView = new UserEditView({model: this.model});
  },

  render: function() {
    this.$el.html( this.template() );
    this.$el.find('.user_edit_view').hide();

    this.userShowView.setElement(this.$el.find('.user_show_view')[0]);
    this.userEditView.setElement(this.$el.find('.user_edit_view')[0]);

    this.userShowView.render();
    this.userEditView.render();

    return this;
  }
});

exports.UserView = UserView;
