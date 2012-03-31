// ModuleA - CommonJS module

// Constructor
function ModuleA() {
  if (!(this instanceof ModuleA)) {
    return new ModuleA();
  }

  var additionMethod = require('./adder_plus_one').add;
  this.sum = function(a, b) { 
    return additionMethod(a, b); 
  };
}

exports.ModuleA = ModuleA;
