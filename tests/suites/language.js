module('Language', {
    setup: function(){
        this.input = $('<input type="text">').appendTo('#qunit-fixture');
        this.date = UTCDate(2012, 2, 15, 0, 0, 0, 0); // March 15, 2012
    },
    teardown: function(){
        this.input.data('datepicker').picker.remove();
    }
});

test('language-default: Default language format.', function(){
    this.input
        .val('03/16/2012')
        .datepicker();
    equal(this.input.val(), '03/16/2012');
});

test('language-it: Italian language format.', function(){
    this.input
        .val('16/03/2012')
        .datepicker();
    equal(this.input.val(), '16/03/2012');
});

test('language-tr: Turkish language format.', function(){
    this.input
        .val('16.03.2012')
        .datepicker({language: 'tr'});
    equal(this.input.val(), '16.03.2012');
});