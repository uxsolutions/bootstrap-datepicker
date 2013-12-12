exports.compileScss = function(test){
  var grunt = require('grunt'),
      fs = require('fs'),
      jsdiff = require('diff'),
      t = test,
      filename = 'css/datepicker.css',
      patchfile = 'test/support/scss.patch',
      readFile = function(name) { return fs.readFileSync(name, {encoding: 'utf8'}) },
      orig = readFile(filename),
      generated = readFile('test/output/build_standalone-sass.css'),
      patch = readFile(patchfile),
      diff = jsdiff.createPatch(filename, orig, generated);

      // Save the output for future tests.
      // fs.writeFileSync(patchfile, diff);

      t.equal(patch, diff);
      t.done();
};
