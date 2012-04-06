/**
 * Bootstrap-datepicker backend for moment.js <http://momentjs.com/>
 *
 * Requires moment.js v1.5.0+
 */
;(function($){
	$.fn.datepicker.setBackend({
		name: 'moment',
		getDaysInMonth: function (date) {
			return moment(date).daysInMonth();
		},
		parseDate: function(date, format, language) {
			if (date instanceof Date) return date;
			if (/^[-+]\d+[dmwy]([\s,]+[-+]\d+[dMwy])*$/.test(date)) {
				var part_re = /([-+]\d+)([dMwy])/,
					parts = date.match(/([-+]\d+)([dMwy])/g);
				date = moment().sod();
				for (var i=0; i<parts.length; i++) {
					date.add(parts[i][2], parseFloat(parts[i][1]));
				}
				return date.toDate();
			}
			return (moment(date, format)||moment()).sod().toDate();
		},
		formatDate: function(date, format, language){
			return moment(date).format(format);
		},
		moveMonth: function(date, dir){
			return moment(date).add('months', dir).toDate();
		},
		moveYear: function(date, dir){
			return moment(date).add('years', dir).toDate();
		}
	});
}(jQuery));