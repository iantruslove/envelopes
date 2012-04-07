
var UserAddView = Backbone.View.extend({

  className: "user_add_view",

  events: {
    "click .cancel" : "onCancelAction",
    "click .save"   : "onSaveAction",
    "click .add"    : "addNewUser"
  },

  templates: {
    outline: _.template(
               '<div class="entry_form"></div>' + 
               '<div class="controls"></div>'),
    entryForm: _.template(
                '<input type="text" class="fname"></input>'  + 
                '<input type="text" class="lname"></input>'  + 
                '<input type="text" class="email"></input>'  + 
                '<button class="save">Save</button> ' + 
                '<button class="cancel">Cancel</button>'),
    controls: _.template('<button class="add">Add</button>')
    
  },
  
  render: function() {
    this.$el.html( this.templates.outline() );
    this.$el.find('.entry_form').html( this.templates.entryForm() );
    this.$el.find('.controls').html( this.templates.controls() );
    this.showControls();

    return this;
  },

  onCancelAction: function() {
    this.showControls();
  },

  onSaveAction: function() {
    var newUser = new Backbone.Model();

    newUser.save({
      fname : this.$el.find('.fname').val(),
      lname : this.$el.find('.lname').val(),
      email : this.$el.find('.email').val()
    },{
      url : this.collection.url,
      success : _.bind(function(model, response){
        // TODO: pull in Cowboy's debug lib and replace all the console.log statements
        console.log("save ok");
        this.collection.add(model);
      }, this), 
      error : function(model, response){
        console.error("save failed - " + response.responseText);
      }
    });

    this.showControls();
  }, 

  showControls: function() {
    this.$el.find('.entry_form').hide();
    this.$el.find('.controls').show();
  }, 

  showEntryForm: function() {
    this.clearEntryFields();
    this.$el.find('.entry_form').show();
    this.$el.find('.controls').hide();
  },

  addNewUser: function() {
    this.showEntryForm();
  },

  clearEntryFields: function() {
    this.$el.find('input').val('');
  }

});

exports.UserAddView = UserAddView;

