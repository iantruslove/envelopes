
var UserEditView = Backbone.View.extend({

  className: "user_edit_view",

  dataKeys: ['fname', 'lname', 'email'],

  events: {
    "click .save"   : "onSaveAction",
    "click .delete" : "onDeleteAction"
  },

  templates: { 
    field: _.template('<input type="text" class="edit_data_field <%= fieldName %>" value="<%= fieldValue %>"></input>'),
    controls: _.template(
      '<button class="save">Save</button> ' + 
      '<button class="cancel">Cancel</button>' +
      '<button class="delete">Delete</button>'
      )
  },

  initialize: function () {
    //TODO: This isn't quite right.  Is there a base class trying to get out?
    //
    //_.extend(this, require('../base_view_mixin').BaseViewMixin);
    this.model.bind("destroy", this.onDestroyModel, this);
  },
  
  renderBaseView: function() {
    // TODO: Less DOM manipulation - do it out of the DOM and insert the final element structure
    this.$el.empty();
    _.each(this.dataKeys, function(fieldName) {
      this.$el.append(this.templates.field({
        fieldName: fieldName,
        fieldValue: this.model.get(fieldName)
      }));
    }, this);
    this.$el.append( this.templates.controls() );

    return this;
  },

  render: function () {
    return this.renderBaseView();
  },

  onDestroyModel: function() {
    this.$el.html("");
  },

  onSaveAction: function() {
    var objectToSave = {};
    _.each( this.dataKeys, function(item) {
      objectToSave[item] = this.$el.find('.' + item).val();
    }, this);

    this.model.save(objectToSave, {
      success: function (model, response) {
        console.log("Model " + model.id + " updated ok");
      },
      error: function (model, response) {
        console.error("Error - " + response.responseText);
      }
    });
  },

  onDeleteAction: function() {
    this.model.destroy({
      success: _.bind(function(model, response) {
        console.log("Deleted model " + model.id);
        this.$el.hide("fast");
      }, this), 
      error: function(model, response) {
        console.error("Error - " + response.responseText);
      }
    });
  }

});

exports.UserEditView = UserEditView;
