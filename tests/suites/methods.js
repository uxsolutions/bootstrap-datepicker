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

// test('update - String', function(){
    
// });

// test('update - Date', function(){
    
// });

test('setDate', function(){
    var dateToSet = new Date(2013,01,01,12,00,00,00);
    
    notEqual(this.dp.date,dateToSet);
    this.dp.setDate(dateToSet);
    datesEqual(this.dp.date.getTime(),dateToSet.getTime());
});

test('setUTCDate', function(){
    var dateToSet = Date.UTC(2012,3,5);

    notEqual(this.dp.date,dateToSet);
    this.dp.setUTCDate(dateToSet);
    datesEqual(this.dp.date,dateToSet);
});

// test('setStartDate', function(){

// });

// test('setEndDate', function(){

// });

// test('setDaysOfWeekDisabled - String', function(){

// });

// test('setDaysOfWeekDisabled - Array', function(){

// });