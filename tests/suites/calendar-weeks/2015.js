module('Calendar Weeks (2015)', {
  setup: function(){},
  teardown: function(){
    $('#qunit-fixture *').each(function(){
      var t = $(this);
      if ('datepicker' in t.data())
        t.datepicker('destroy');
    });
  }
});

test('displays correct calendar week using US system', function(){
  this.input = $('<input type="text">')
    .appendTo('#qunit-fixture')
    .val('2015-01-02')
    .datepicker({
      format: 'yyyy-mm-dd',
      calendarWeeks: true
    });
  this.dp = this.input.data('datepicker');
  this.picker = this.dp.picker;
  var target = this.picker.find('.datepicker-days tbody tr');

  equal(target.length, 6);
  target.each(function(i){
    var t = $(this).children().first();
    equal(t.text(), i + 1, "Displays correct calendar weeks");
  });
});

test('displays correct calendar week using ISO 8601', function(){
  this.input = $('<input type="text">')
    .appendTo('#qunit-fixture')
    .val('2015-01-02')
    .datepicker({
      format: 'yyyy-mm-dd',
      calendarWeeks: true,
      language: 'de'
    });
  this.dp = this.input.data('datepicker');
  this.picker = this.dp.picker;
  var target = this.picker.find('.datepicker-days tbody tr');

  equal(target.length, 6);
  target.each(function(i){
    var t = $(this).children().first();
    equal(t.text(), i + 1, "Displays correct calendar weeks");
  });
});
