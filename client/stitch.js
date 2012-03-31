var fs      = require('fs');
var stitch  = require('stitch');

var packager = stitch.createPackage({
    paths: [__dirname + '/client/src']
});

packager.compile(function (err, source){
    fs.writeFile('package.js', source, function (err) {
      if (err) throw err;
      console.log('Compiled package.js');
    });

    var jsp = require("uglify-js").parser;
    var pro = require("uglify-js").uglify;

    var orig_code = source;
    var ast = jsp.parse(orig_code); // parse code and get the initial AST
    ast = pro.ast_mangle(ast); // get a new AST with mangled names
    ast = pro.ast_squeeze(ast); // get an AST with compression optimizations
    var final_code = pro.gen_code(ast); // compressed code here

    fs.writeFile('package-min.js', final_code, function(err) {
      if (err) throw err;
      console.log('Compiled package-min.js');
    });
});
