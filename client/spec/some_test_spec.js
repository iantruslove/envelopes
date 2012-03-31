
describe('jasmine-node-flat', function(){
  it('should pass', function(){
    expect(1+2).toEqual(3);
  });
});

describe("a module with dependencies", function() {
  it ('should be able to use another module', function() {
    var module = require('../src/module_a').ModuleA();

    expect(module.sum(2, 3)).toEqual(6);
  });
});

describe("CommonJS construction pattern", function() {
  it("should be callable like a regular constructor", function() {
    var ModuleA = require('../src/module_a').ModuleA;
    var instance = new ModuleA();
    expect(instance instanceof ModuleA).toBe(true);
  });

  it("should act like a factory", function() {
    var ModuleA = require('../src/module_a').ModuleA;
    var instance = ModuleA();

    expect(instance instanceof ModuleA).toBe(true);
  });

});
