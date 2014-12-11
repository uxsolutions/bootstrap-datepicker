module('Active View Class', {
    setup: function(){
        this.input = $('<input type="text" value="31-03-2011">')
                        .appendTo('#qunit-fixture')
                        .datepicker({
                            format: "dd-mm-yyyy",
                            horizontal: true
                        });
        this.dp = this.input.data('datepicker');
        this.input.focus();
    },
    teardown: function(){
        this.dp.remove();
    }
});

test('Select a different month and different year', function(){
    // we click on July...
    var month = this.dp.picker.find('.datepicker-months tbody span:contains(Jul)');
    month.click();
    // July must be marked as active-view
    ok(this.dp.picker.find('.datepicker-months tbody span:contains(Jul)').is('.active-view'), 'Selected Month is active (view)');
    // we click on 2012
    var year = this.dp.picker.find('.datepicker-years tbody span:contains(2012)');
    year.click();
    ok(this.dp.picker.find('.datepicker-years tbody span:contains(2012)').is('.active-view'), 'Selected Year is active (view)');
});
