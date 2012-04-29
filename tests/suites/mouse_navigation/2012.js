module('Mouse Navigation 2012', {
    setup: function(){
        /*
            Tests start with picker on March 31, 2012.  Fun facts:

            * February 1, 2012 was on a Wednesday
            * February 29, 2012 was on a Wednesday
            * March 1, 2012 was on a Thursday
            * March 31, 2012 was on a Saturday
        */
        this.input = $('<input type="text" value="31-03-2012">')
                        .appendTo('#qunit-fixture')
                        .datepicker({format: "dd-mm-yyyy"})
                        .focus(); // Activate for visibility checks
        this.dp = this.input.data('datepicker')
        this.picker = this.dp.picker;
    },
    teardown: function(){
        this.picker.remove();
    }
});

test('Selecting date resets viewDate and date', function(){
    var target;

    // Rendered correctly
    equal(this.dp.viewMode, 0);
    target = this.picker.find('.datepicker-days tbody td:first');
    equal(target.text(), '26'); // Should be Feb 26

    // Updated internally on click
    target.click();
    deepEqual(this.dp.viewDate, new Date(2012, 1, 26),
              'Expected: '+format_date(new Date(2012, 1, 26))+'; Got: '+format_date(this.dp.viewDate))
    deepEqual(this.dp.date, new Date(2012, 1, 26),
              'Expected: '+format_date(new Date(2012, 1, 26))+'; Got: '+format_date(this.dp.date))

    // Re-rendered on click
    target = this.picker.find('.datepicker-days tbody td:first');
    equal(target.text(), '29'); // Should be Jan 29
});

test('Navigating next/prev by month', function(){
    var target;

    equal(this.dp.viewMode, 0);
    target = this.picker.find('.datepicker-days thead th.prev');
    ok(target.is(':visible'), 'Month:prev nav is visible');

    // Updated internally on click
    target.click();
    // Should handle month-length changes gracefully
    deepEqual(this.dp.viewDate, new Date(2012, 1, 29),
              'Expected: '+format_date(new Date(2012, 1, 29))+'; Got: '+format_date(this.dp.viewDate));
    deepEqual(this.dp.date, new Date(2012, 2, 31),
              'Expected: '+format_date(new Date(2012, 2, 31))+'; Got: '+format_date(this.dp.date));

    // Re-rendered on click
    target = this.picker.find('.datepicker-days tbody td:first');
    equal(target.text(), '29'); // Should be Jan 29

    target = this.picker.find('.datepicker-days thead th.next');
    ok(target.is(':visible'), 'Month:next nav is visible');

    // Updated internally on click
    target.click().click();
    // Graceful moonth-end handling carries over
    deepEqual(this.dp.viewDate, new Date(2012, 3, 29),
              'Expected: '+format_date(new Date(2012, 3, 29))+'; Got: '+format_date(this.dp.viewDate));
    deepEqual(this.dp.date, new Date(2012, 2, 31),
              'Expected: '+format_date(new Date(2012, 2, 31))+'; Got: '+format_date(this.dp.date));

    // Re-rendered on click
    target = this.picker.find('.datepicker-days tbody td:first');
    equal(target.text(), '25'); // Should be Mar 25
    // (includes "old" days at start of month, even if that's all the first week-row consists of)
});

test('Navigating to/from year view', function(){
    var target;

    equal(this.dp.viewMode, 0);
    target = this.picker.find('.datepicker-days thead th.switch');
    ok(target.is(':visible'), 'View switcher is visible');

    target.click();
    ok(this.picker.find('.datepicker-months').is(':visible'), 'Month picker is visible');
    equal(this.dp.viewMode, 1);
    // Not modified when switching modes
    deepEqual(this.dp.viewDate, new Date(2012, 2, 31),
              'Expected: '+format_date(new Date(2012, 2, 31))+'; Got: '+format_date(this.dp.viewDate));
    deepEqual(this.dp.date, new Date(2012, 2, 31),
              'Expected: '+format_date(new Date(2012, 2, 31))+'; Got: '+format_date(this.dp.date));

    // Change months to test internal state
    target = this.picker.find('.datepicker-months tbody span:contains(Apr)');
    target.click();
    equal(this.dp.viewMode, 0);
    // Only viewDate modified
    deepEqual(this.dp.viewDate, new Date(2012, 3, 30), // Apr 30
              'Expected: '+format_date(new Date(2012, 3, 30))+'; Got: '+format_date(this.dp.viewDate));
    deepEqual(this.dp.date, new Date(2012, 2, 31),
              'Expected: '+format_date(new Date(2012, 2, 31))+'; Got: '+format_date(this.dp.date));
});

test('Navigating to/from decade view', function(){
    var target;

    equal(this.dp.viewMode, 0);
    target = this.picker.find('.datepicker-days thead th.switch');
    ok(target.is(':visible'), 'View switcher is visible');

    target.click();
    ok(this.picker.find('.datepicker-months').is(':visible'), 'Month picker is visible');
    equal(this.dp.viewMode, 1);
    // Not modified when switching modes
    deepEqual(this.dp.viewDate, new Date(2012, 2, 31),
              'Expected: '+format_date(new Date(2012, 2, 31))+'; Got: '+format_date(this.dp.viewDate))
    deepEqual(this.dp.date, new Date(2012, 2, 31),
              'Expected: '+format_date(new Date(2012, 2, 31))+'; Got: '+format_date(this.dp.date))

    target = this.picker.find('.datepicker-months thead th.switch');
    ok(target.is(':visible'), 'View switcher is visible');

    target.click();
    ok(this.picker.find('.datepicker-years').is(':visible'), 'Year picker is visible');
    equal(this.dp.viewMode, 2);
    // Not modified when switching modes
    deepEqual(this.dp.viewDate, new Date(2012, 2, 31),
              'Expected: '+format_date(new Date(2012, 2, 31))+'; Got: '+format_date(this.dp.viewDate))
    deepEqual(this.dp.date, new Date(2012, 2, 31),
              'Expected: '+format_date(new Date(2012, 2, 31))+'; Got: '+format_date(this.dp.date))

    // Change years to test internal state changes
    target = this.picker.find('.datepicker-years tbody span:contains(2011)');
    target.click();
    equal(this.dp.viewMode, 1);
    // Only viewDate modified
    deepEqual(this.dp.viewDate, new Date(2011, 2, 31),
              'Expected: '+format_date(new Date(2011, 2, 31))+'; Got: '+format_date(this.dp.viewDate));
    deepEqual(this.dp.date, new Date(2012, 2, 31),
              'Expected: '+format_date(new Date(2012, 2, 31))+'; Got: '+format_date(this.dp.date));

    target = this.picker.find('.datepicker-months tbody span:contains(Apr)');
    target.click();
    equal(this.dp.viewMode, 0);
    // Only viewDate modified
    deepEqual(this.dp.viewDate, new Date(2011, 3, 30),
              'Expected: '+format_date(new Date(2012, 3, 30))+'; Got: '+format_date(this.dp.viewDate));
    deepEqual(this.dp.date, new Date(2012, 2, 31),
              'Expected: '+format_date(new Date(2012, 2, 31))+'; Got: '+format_date(this.dp.date));
});

test('Navigating prev/next in year view', function(){
    var target;

    equal(this.dp.viewMode, 0);
    target = this.picker.find('.datepicker-days thead th.switch');
    ok(target.is(':visible'), 'View switcher is visible');

    target.click();
    ok(this.picker.find('.datepicker-months').is(':visible'), 'Month picker is visible');
    equal(this.dp.viewMode, 1);
    equal(this.picker.find('.datepicker-months thead th.switch').text(), '2012');
    // Not modified when switching modes
    deepEqual(this.dp.viewDate, new Date(2012, 2, 31),
              'Expected: '+format_date(new Date(2012, 2, 31))+'; Got: '+format_date(this.dp.viewDate));
    deepEqual(this.dp.date, new Date(2012, 2, 31),
              'Expected: '+format_date(new Date(2012, 2, 31))+'; Got: '+format_date(this.dp.date));

    // Go to next year (2013)
    target = this.picker.find('.datepicker-months thead th.next');
    target.click();
    equal(this.picker.find('.datepicker-months thead th.switch').text(), '2013');
    // Only viewDate modified
    deepEqual(this.dp.viewDate, new Date(2013, 2, 31),
              'Expected: '+format_date(new Date(2012, 2, 31))+'; Got: '+format_date(this.dp.viewDate));
    deepEqual(this.dp.date, new Date(2012, 2, 31),
              'Expected: '+format_date(new Date(2012, 2, 31))+'; Got: '+format_date(this.dp.date));

    // Go to prev year (x2 == 2011)
    target = this.picker.find('.datepicker-months thead th.prev');
    target.click().click();
    equal(this.picker.find('.datepicker-months thead th.switch').text(), '2011');
    // Only viewDate modified
    deepEqual(this.dp.viewDate, new Date(2011, 2, 31),
              'Expected: '+format_date(new Date(2012, 2, 31))+'; Got: '+format_date(this.dp.viewDate));
    deepEqual(this.dp.date, new Date(2012, 2, 31),
              'Expected: '+format_date(new Date(2012, 2, 31))+'; Got: '+format_date(this.dp.date));
});

test('Navigating prev/next in decade view', function(){
    var target;

    equal(this.dp.viewMode, 0);
    target = this.picker.find('.datepicker-days thead th.switch');
    ok(target.is(':visible'), 'View switcher is visible');

    target.click();
    ok(this.picker.find('.datepicker-months').is(':visible'), 'Month picker is visible');
    equal(this.dp.viewMode, 1);
    // Not modified when switching modes
    deepEqual(this.dp.viewDate, new Date(2012, 2, 31),
              'Expected: '+format_date(new Date(2012, 2, 31))+'; Got: '+format_date(this.dp.viewDate))
    deepEqual(this.dp.date, new Date(2012, 2, 31),
              'Expected: '+format_date(new Date(2012, 2, 31))+'; Got: '+format_date(this.dp.date))

    target = this.picker.find('.datepicker-months thead th.switch');
    ok(target.is(':visible'), 'View switcher is visible');

    target.click();
    ok(this.picker.find('.datepicker-years').is(':visible'), 'Year picker is visible');
    equal(this.dp.viewMode, 2);
    equal(this.picker.find('.datepicker-years thead th.switch').text(), '2010-2019');
    // Not modified when switching modes
    deepEqual(this.dp.viewDate, new Date(2012, 2, 31),
              'Expected: '+format_date(new Date(2012, 2, 31))+'; Got: '+format_date(this.dp.viewDate))
    deepEqual(this.dp.date, new Date(2012, 2, 31),
              'Expected: '+format_date(new Date(2012, 2, 31))+'; Got: '+format_date(this.dp.date))

    // Go to next decade (2020-29)
    target = this.picker.find('.datepicker-years thead th.next');
    target.click();
    equal(this.picker.find('.datepicker-years thead th.switch').text(), '2020-2029');
    // Only viewDate modified
    deepEqual(this.dp.viewDate, new Date(2022, 2, 31),
              'Expected: '+format_date(new Date(2012, 2, 31))+'; Got: '+format_date(this.dp.viewDate));
    deepEqual(this.dp.date, new Date(2012, 2, 31),
              'Expected: '+format_date(new Date(2012, 2, 31))+'; Got: '+format_date(this.dp.date));

    // Go to prev year (x2 == 2000-09)
    target = this.picker.find('.datepicker-years thead th.prev');
    target.click().click();
    equal(this.picker.find('.datepicker-years thead th.switch').text(), '2000-2009');
    // Only viewDate modified
    deepEqual(this.dp.viewDate, new Date(2002, 2, 31),
              'Expected: '+format_date(new Date(2012, 2, 31))+'; Got: '+format_date(this.dp.viewDate));
    deepEqual(this.dp.date, new Date(2012, 2, 31),
              'Expected: '+format_date(new Date(2012, 2, 31))+'; Got: '+format_date(this.dp.date));
});
