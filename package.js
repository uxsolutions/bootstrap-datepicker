Package.describe({
  name: 'eternicode:bootstrap-datepicker',
  version: '1.5.1',
  summary: 'A datepicker for bootstrap',
  git: 'https://github.com/rgnevashev/bootstrap-datepicker.git',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.addFiles([
    "dist/css/bootstrap-datepicker3.css",
    "dist/js/bootstrap-datepicker.js"
  ], 'client');
});
