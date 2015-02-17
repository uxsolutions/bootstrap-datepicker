module('OptionsDefaultMonthDay', {
    setup: function(){},
    teardown: function(){
        $('#qunit-fixture *').each(function(){
            var t = $(this);
            if ('datepicker' in t.data())
                t.datepicker('remove');
        });
    }
});

test('Default Month', function(){
    var input = $('<input />')
                .appendTo('#qunit-fixture')
                .val('2014-04-03')
                .datepicker({
                    autoclose: true,
                    format: 'yyyy-mm-dd',
                    minViewMode: 'years',
                    startView: 'decade',
                    defaultMonth: 3
                }),
        dp = input.data('datepicker'),
        picker = dp.picker,
        target;

    input.focus();

    target = picker.find('.datepicker-years td span:nth(3)');
    equal(target.text(), '2012');

    target.click();
    datesEqual(dp.dates[0], UTCDate(2012, 3, 1));
    datesEqual(dp.viewDate, UTCDate(2012, 3, 1));
});

test('Default Day with "years" view', function(){
    var input = $('<input />')
                .appendTo('#qunit-fixture')
                .val('2014-04-03')
                .datepicker({
                    autoclose: true,
                    format: 'yyyy-mm-dd',
                    minViewMode: 'years',
                    startView: 'decade',
                    defaultDay: 14
                }),
        dp = input.data('datepicker'),
        picker = dp.picker,
        target;

    input.focus();

    target = picker.find('.datepicker-years td span:nth(3)');
    equal(target.text(), '2012');

    target.click();
    datesEqual(dp.dates[0], UTCDate(2012, 0, 14));
    datesEqual(dp.viewDate, UTCDate(2012, 0, 14));
});

test('Default Day "last"', function(){
    var input = $('<input />')
                .appendTo('#qunit-fixture')
                .val('2014-04-03')
                .datepicker({
                    autoclose: true,
                    format: 'yyyy-mm-dd',
                    minViewMode: 'months',
                    startView: 'year',
                    defaultDay: 'last'
                }),
        dp = input.data('datepicker'),
        picker = dp.picker,
        target;

    input.focus();

    target = picker.find('.datepicker-months tbody span:nth(1)');
    equal(target.text(), 'Feb');

    target.click();
    datesEqual(dp.dates[0], UTCDate(2014, 1, 28));
    datesEqual(dp.viewDate, UTCDate(2014, 1, 28));
});


test('Default Day greater than month length', function(){
    var input = $('<input />')
                .appendTo('#qunit-fixture')
                .val('2014-04-03')
                .datepicker({
                    autoclose: true,
                    format: 'yyyy-mm-dd',
                    minViewMode: 'months',
                    startView: 'year',
                    defaultDay: 30
                }),
        dp = input.data('datepicker'),
        picker = dp.picker,
        target;

    input.focus();

    target = picker.find('.datepicker-months tbody span:nth(1)');
    equal(target.text(), 'Feb');

    target.click();
    datesEqual(dp.dates[0], UTCDate(2014, 1, 28));
    datesEqual(dp.viewDate, UTCDate(2014, 1, 28));
});

test('Default Day valid number', function(){
    var input = $('<input />')
                .appendTo('#qunit-fixture')
                .val('2014-04-03')
                .datepicker({
                    autoclose: true,
                    format: 'yyyy-mm-dd',
                    minViewMode: 'months',
                    startView: 'year',
                    defaultDay: 14
                }),
        dp = input.data('datepicker'),
        picker = dp.picker,
        target;

    input.focus();

    target = picker.find('.datepicker-months tbody span:nth(1)');
    equal(target.text(), 'Feb');

    target.click();
    datesEqual(dp.dates[0], UTCDate(2014, 1, 14));
    datesEqual(dp.viewDate, UTCDate(2014, 1, 14));
});
