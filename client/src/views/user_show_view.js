var UserShowView = Backbone.View.extend({

  className: "user_show_view",

  dataKeys: ['fname', 'lname', 'email'],

  events: {
  },

  templates: { 
    field: _.template('<span class="data_field <%= fieldName %>"><%= fieldValue %></span>'),
    controls: _.template('<button class="edit">Edit</button>')
  },

  initialize: function () {
    _.extend(this, require('../base_view_mixin').BaseViewMixin);
    this.model.bind("change", this.render, this);
    this.model.bind("destroy", this.onDestroyModel, this);
  },

  render: function () {
    this.$el.html( this.renderBaseView(this.model, this.dataKeys, this.templates) );
    return this;
  },

  onDestroyModel: function() {
    this.$el.html("");
  }

});

exports.UserShowView = UserShowView;
