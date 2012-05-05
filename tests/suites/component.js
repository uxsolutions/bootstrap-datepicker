module('Component', {
    setup: function(){
        this.component = $('<div class="input-append date" id="datepicker">'+
                                '<input size="16" type="text" value="12-02-2012" readonly>'+
                                '<span class="add-on"><i class="icon-th"></i></span>'+
                            '</div>')
                        .appendTo('#qunit-fixture')
                        .datepicker({format: "dd-mm-yyyy"});
        this.input = this.component.find('input');
        this.addon = this.component.find('.add-on');
        this.dp = this.component.data('datepicker')
        this.picker = this.dp.picker;
    },
    teardown: function(){
        this.picker.remove();
    }
});


test('Component gets date/viewDate from input value', function(){
    datesEqual(this.dp.date, new Date(2012, 1, 12));
    datesEqual(this.dp.viewDate, new Date(2012, 1, 12));
});

test('Activation by component', function(){
    ok(!this.picker.is(':visible'));
    this.addon.click();
    ok(this.picker.is(':visible'));
});

test('simple keyboard nav test', function(){
    var target;

    equal(this.dp.viewMode, 0);
    target = this.picker.find('.datepicker-days thead th.switch');
    equal(target.text(), 'February 2012', 'Title is "February 2012"');
    datesEqual(this.dp.date, new Date(2012, 1, 12));
    datesEqual(this.dp.viewDate, new Date(2012, 1, 12));

    // Navigation: -1 day, left arrow key
    this.input.trigger({
        type: 'keydown',
        keyCode: 37
    });
    datesEqual(this.dp.viewDate, new Date(2012, 1, 11));
    datesEqual(this.dp.date, new Date(2012, 1, 11));
    // Month not changed
    target = this.picker.find('.datepicker-days thead th.switch');
    equal(target.text(), 'February 2012', 'Title is "February 2012"');

    // Navigation: +1 month, shift + right arrow key
    this.input.trigger({
        type: 'keydown',
        keyCode: 39,
        shiftKey: true
    });
    datesEqual(this.dp.viewDate, new Date(2012, 2, 11));
    datesEqual(this.dp.date, new Date(2012, 2, 11));
    target = this.picker.find('.datepicker-days thead th.switch');
    equal(target.text(), 'March 2012', 'Title is "March 2012"');

    // Navigation: -1 year, ctrl + left arrow key
    this.input.trigger({
        type: 'keydown',
        keyCode: 37,
        ctrlKey: true
    });
    datesEqual(this.dp.viewDate, new Date(2011, 2, 11));
    datesEqual(this.dp.date, new Date(2011, 2, 11));
    target = this.picker.find('.datepicker-days thead th.switch');
    equal(target.text(), 'March 2011', 'Title is "March 2011"');
});

