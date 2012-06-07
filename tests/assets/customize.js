!function( $ ) {
    var dates = $.fn.datepicker.dates;


    $.fn.datepicker.DPGlobal.formatDate = function (date, format, language) {
        return moment(date).format(format);
    };

    $.fn.datepicker.DPGlobal.parseDate = function (date, format, language) {
        // just do it with moment.js - for instance
        return moment(date, format)._d;
    };

    $.fn.datepicker.DPGlobal.parseFormat = function (format) {
        return format;
    }



}(window.jQuery);
