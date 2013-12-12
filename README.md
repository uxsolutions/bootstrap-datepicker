# bootstrap-datepicker

This is a fork of Stefan Petre's [original code](http://www.eyecon.ro/bootstrap-datepicker/);
thanks go to him for getting this thing started!

Please note that this fork is not used on Stefan's page, nor is it maintained or contributed to by him.

Versions are incremented according to [semver](http://semver.org/).

* [Online Demo](http://eternicode.github.io/bootstrap-datepicker/)
* [Online Docs](http://bootstrap-datepicker.readthedocs.org/) (ReadTheDocs.com)
* [Google Group](https://groups.google.com/group/bootstrap-datepicker/)
* [Travis CI ![Build Status](https://travis-ci.org/eternicode/bootstrap-datepicker.png?branch=master)](https://travis-ci.org/eternicode/bootstrap-datepicker)


## Development

Installing [Grunt](http://gruntjs.com/) will make things a lot easier for you! Take a look at Gruntfile.js for all the tasks that are available.

Running `grunt sassify` will take the existing Less and generate new .scss files for Sass support.

Running `grunt test` will verify that the Less and Sass still generate the expected CSS.

When you're ready to bump the version, `grunt bump:patch` or `grunt bump:minor` will take care of updating files, committing and tagging for you.
