Package.describe({
  name: 'eternicode:bootstrap-datepicker',
  version: '1.5.1',
  summary: 'A datepicker for bootstrap',
  git: 'https://github.com/rgnevashev/fullcalendar',
  documentation: 'README.md'
});

Npm.depends({
    'bootstrap-datepicker': '1.5.1'
});

Package.onUse(function(api) {
  api.addFiles([
  ], 'client');
});
