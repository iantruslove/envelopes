
//TODO: What else can be pulled into this?  
//TODO: Make the mixin functions purely functional - it'll be more performant with the DOM manipulations too...
exports.BaseViewMixin = {

  // @returns new elements to insert into the DOM
  renderBaseView: function(model, dataKeys, templates) {
    var $parent = $('<div></div>');
    
    _.each(dataKeys, function(fieldName) {
      $parent.append(templates.field({
        fieldName: fieldName,
        fieldValue: model.get(fieldName)
      }));
    }, this);
    $parent.append( templates.controls() );

    var $el = $parent.children().detach();

    return $el;
  }
};

