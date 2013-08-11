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
    datesEqual(this.dp.date, UTCDate(2012, 2, 13));
    var date = this.dp.picker.find('.datepicker-days td:contains(13)');
    ok(date.is('.active'), 'Date is selected');
});

test('update - Date', function(){
    this.dp.update(new Date(2012, 2, 13));
    datesEqual(this.dp.date, UTCDate(2012, 2, 13));
    var date = this.dp.picker.find('.datepicker-days td:contains(13)');
    ok(date.is('.active'), 'Date is selected');
});

test('setDate', function(){
    var date_in = new Date(2013, 1, 1),
        expected_date = new Date(Date.UTC(2013, 1, 1));

    notEqual(this.dp.date, date_in);
    this.dp.setDate(date_in);
    datesEqual(this.dp.date, expected_date);
});

test('setUTCDate', function(){
    var date_in = new Date(Date.UTC(2012, 3, 5)),
        expected_date = date_in;

    notEqual(this.dp.date, date_in);
    this.dp.setUTCDate(date_in);
    datesEqual(this.dp.date, expected_date);
});

// test('setStartDate', function(){

// });

// test('setEndDate', function(){

// });

// test('setDaysOfWeekDisabled - String', function(){

// });

// test('setDaysOfWeekDisabled - Array', function(){

// });
