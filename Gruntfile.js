var _ = require('lodash');

module.exports = function(grunt) {
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // Project configuration.
  grunt.initConfig({
    nodeunit: {
      all: ['test/*_test.js']
    },

    less: {
      options: {
        verbose: true
      },
      test: {
        files: {
          "test/output/datepicker-less.css": "build/build_standalone.less"
        }
      },
      build: {
        files: {
          "css/datepicker.css": "build/build_standalone.less"
        }
      }
    },

    compass: {
      options: {
        outputStyle: 'expanded',
        require: 'bootstrap-sass',
        noLineComments: true,
        specify: '**/*-sass.scss'
      },
      test: {
        options: {
          sassDir: 'sass/',
          cssDir: 'test/output/',
        }
      },
      build: {
        options: {
          sassDir: 'sass/',
          cssDir: 'css/',
        }
      }
    },

    copy: {
      sass: {
        expand: true,
        cwd: 'less',
        dest: 'sass/',
        src: '**/*.less',
        ext: '.scss'
      },
      build: {
        expand: true,
        cwd: 'build',
        dest: 'sass/',
        src: 'build_standalone.less',
        ext: '-sass.scss'
      }
    },

    // Just enough Less to Sass conversion to work.
    sed: {
      sassifyPrepend: {
        path: './sass/',
        recursive: true,
        pattern: / \*\/\n/,
        replacement: function(comment){
          return comment + '\n' + '@import "bootstrap/variables";\n@import "bootstrap/mixins";\n';
        },
      },
      sassifyDefault: {
        path: './sass/',
        recursive: true,
        pattern: /([\s]*@[\w-]+\: *[^;]+);/g,
        replacement: function(string, assignment){
          return assignment + ' !default;\n';
        },
      },
      sassifyVariable: {
        path: './sass/',
        recursive: true,
        pattern: /@([\w-]+)/g,
        replacement: function(string, variable){
          return _.contains(['import', 'extend', 'include', 'mixin', 'function', 'return'], variable) ? '@'+variable : '$'+variable;
        },
      },
      sassifyInclude: {
        path: './sass/',
        recursive: true,
        pattern: /\.([\w-]+\([\w- \.,\(\)\$]*\);)/g,
        replacement: function(string, mixin){
          return '@include '+mixin;
        },
      },
      sassifyMixin: {
        path: './sass/',
        recursive: true,
        pattern: /\.([\w-]+\([\w- \.,\(\)\$]*\) *{)/g,
        replacement: function(string, mixin){
          console.log(mixin);
          return '@mixin '+mixin;
        },
      },
      sassifyInterpolation: {
        path: './sass/',
        recursive: true,
        pattern: /~"([^"]+)"/g,
        replacement: function(string, interpolation){
          return interpolation.replace(/@{/g, '#{$');
        },
      },
      sassifyImport: {
        path: './sass/',
        recursive: true,
        pattern: /@import "([\w-_\.]+)";/g,
        replacement: function(string, file){
          var aliases = {
            'build.less': 'datepicker'
          };
          return '@import "' + (aliases[file] || file) + '";';
        },
      },
      sassifyFunction: {
        path: './sass/',
        recursive: true,
        pattern: /([\w-]+)\(/g,
        replacement: function(string, method){
          var aliases = {
            argb: 'ie-hex-str',
            fadein: 'percent_opacify',
            spin: 'adjust-hue',
            e: 'unquote'
          };
          return (aliases[method] || method) + '(';
        },
      }
    },

    jshint: {
      all: ['Gruntfile.js', '*.json', 'js/**/*.js', '!**/*.min.js']
    },

    bump: {
      options: {
        files: ['package.json', 'bower.json', 'lib/bootstrap-datepicker/version.rb'],
        commitFiles: ['-a'],
        push: false
      }
    }

  });

  grunt.registerTask('sassify', ['copy', 'sed']);
  grunt.registerTask('test', ['less:test', 'compass:test', 'nodeunit']);

  // The official build is from less. compass:build would build the css from sass.
  grunt.registerTask('build', ['less:build']);

};
