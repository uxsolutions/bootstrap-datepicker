module('Methods', {
    setup: function(){
        this.input = $('<input type="text" value="31-03-2011">')
                        .appendTo('#qunit-fixture')
                        .datepicker({format: "dd-mm-yyyy"});
        this.dp = this.input.data('datepicker')
    },
    teardown: function(){
        this.dp.remove();
    }
});

// test('remove', function(){

// });

// test('show', function(){

// });

// test('hide', function(){

// });

test('update - String', function(){
    this.dp.update('13-03-2012');
    datesEqual(this.dp.dates[0], UTCDate(2012, 2, 13));
    var date = this.dp.picker.find('.datepicker-days td:contains(13)');
    ok(date.is('.active'), 'Date is selected');
    var month = this.dp.picker.find('.datepicker-months span:contains(Mar)');
    ok(month.is('.active-view'), 'Month is active (view)');
    var year = this.dp.picker.find('.datepicker-years span:contains(2012)');
    ok(year.is('.active-view'), 'Year is active (view)');
});

test('update - Date', function(){
    this.dp.update(new Date(2012, 2, 13));
    datesEqual(this.dp.dates[0], UTCDate(2012, 2, 13));
    var date = this.dp.picker.find('.datepicker-days td:contains(13)');
    ok(date.is('.active'), 'Date is selected');
    var month = this.dp.picker.find('.datepicker-months span:contains(Mar)');
    ok(month.is('.active-view'), 'Month is active (view)');
    var year = this.dp.picker.find('.datepicker-years span:contains(2012)');
    ok(year.is('.active-view'), 'Year is active (view)');
});

test('update - null', function(){
    this.dp.update(new Date(2012, 2, 13));
    this.dp.update(null);
    equal(this.dp.dates[0], undefined);
    var selected = this.dp.picker.find('.datepicker-days td.active');
    equal(selected.length, 0, 'No date is selected');
    var month = this.dp.picker.find('.datepicker-months span.active-view');
    equal(month.length, 0, 'No Month is active (view)');
    var year = this.dp.picker.find('.datepicker-years span.active-view');
    equal(year.text(), '2012', 'Last selected Year is active (view)');
});

test('setDate', function(){
    var date_in = new Date(2013, 1, 1),
        expected_date = new Date(Date.UTC(2013, 1, 1));

    notEqual(this.dp.dates[0], date_in);
    this.dp.setDate(date_in);
    datesEqual(this.dp.dates[0], expected_date);
});

test('setUTCDate', function(){
    var date_in = new Date(Date.UTC(2012, 3, 5)),
        expected_date = date_in;

    notEqual(this.dp.dates[0], date_in);
    this.dp.setUTCDate(date_in);
    datesEqual(this.dp.dates[0], expected_date);
});

// test('setStartDate', function(){

// });

// test('setEndDate', function(){

// });

// test('setDaysOfWeekDisabled - String', function(){

// });

// test('setDaysOfWeekDisabled - Array', function(){

// });
