function UTCDate(){
    var utcdate = new Date(Date.UTC.apply(Date, arguments));
    if (arguments[0] < 0) {
        utcdate.setUTCFullYear(arguments[0] - 1);
    } else if (arguments[0] < 1900) {
        utcdate.setUTCFullYear(arguments[0]);
    }
    return utcdate;
}


function format_date(date){
    var y = date.getUTCFullYear(),
        m = date.getUTCMonth() + 1,
        d = date.getUTCDate(),
        h = date.getUTCHours(),
        i = date.getUTCMinutes(),
        s = date.getUTCSeconds(),
        l = date.getUTCMilliseconds();
    function z(i){return (i <= 9 ? '0'+i : i);}
    return y+'-'+z(m)+'-'+z(d)+' '+z(h)+':'+z(i)+':'+z(s)+'.'+z(l);
}


function datesEqual(actual, expected, message){
    QUnit.push(QUnit.equiv(actual, expected), format_date(actual), format_date(expected), message);
}

function triggerKey(element, keycode) {
    var evtKeyDown = $.Event( 'keydown', { which: keycode } ),
        evtKeyPress = $.Event( 'keypress', { which: keycode } ),
        evtKeyUp = $.Event( 'keyup' );

    element.trigger(evtKeyDown);
    element.trigger(evtKeyPress);
    element.trigger(evtKeyUp);
}