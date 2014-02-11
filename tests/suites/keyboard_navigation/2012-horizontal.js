module('Keyboard Navigation 2012 - Horizontal', {
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
                        .datepicker({
                            format: "dd-mm-yyyy",
                            horizontal: true
                        })
                        .focus(); // Activate for visibility checks
        this.dp = this.input.data('datepicker')
        this.picker = this.dp.picker;
    },
    teardown: function(){
        this.picker.remove();
    }
});


test('by day (right/left arrows)', function(){
    var target;

    // After selecting another month, keyboard navigation must consider the
    // new date as starting point (not the previously selected one)
    this.picker.find('.datepicker-months span:contains(Jul)').click();

    // Navigation: -1 day, left arrow key
    this.input.trigger({
        type: 'keydown',
        keyCode: 37
    });
    // focus date becomes June 30
    // view and focus updated on keyboard navigation, not selected
    datesEqual(this.dp.viewDate, UTCDate(2012, 5, 30));
    datesEqual(this.dp.dates.get(-1), UTCDate(2012, 2, 31));
    datesEqual(this.dp.focusDate, UTCDate(2012, 5, 30));

    // Navigation: +1 day, right arrow key
    for (var i=0; i<2; i++)
        this.input.trigger({
            type: 'keydown',
            keyCode: 39
        });
    datesEqual(this.dp.viewDate, UTCDate(2012, 6, 2));
    datesEqual(this.dp.dates.get(-1), UTCDate(2012, 2, 31));
    datesEqual(this.dp.focusDate, UTCDate(2012, 6, 2));
});
