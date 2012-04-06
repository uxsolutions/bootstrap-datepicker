/**
 * Default bootstrap-datepicker backend; performs date operations manually.
 */
;(function($){
	var dates = $.fn.datepicker.dates;

	$.fn.datepicker.setBackend({
		name: 'default',
		isLeapYear: function (year) {
			return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0))
		},
		getDaysInMonth: function (date) {
			var month = date.getMonth(),
				year = date.getFullYear();
			return [31, (this.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month]
		},
		parseFormat: function(format){
			var separator = format.match(/[.\/ -].*?/),
				parts = format.split(/\W+/);
			if (!separator || !parts || parts.length == 0){
				throw new Error("Invalid date format.");
			}
			return {separator: separator, parts: parts};
		},
		parseDate: function(date, format, language) {
			if (date instanceof Date) return date;
			if (/^[-+]\d+[dmwy]([\s,]+[-+]\d+[dmwy])*$/.test(date)) {
				var part_re = /([-+]\d+)([dmwy])/,
					parts = date.match(/([-+]\d+)([dmwy])/g),
					part, dir;
				date = new Date();
				for (var i=0; i<parts.length; i++) {
					part = part_re.exec(parts[i]);
					dir = parseInt(part[1]);
					switch(part[2]){
						case 'd':
							date.setDate(date.getDate() + dir);
							break;
						case 'm':
							date = this.moveMonth(date, dir);
							break;
						case 'w':
							date.setDate(date.getDate() + dir * 7);
							break;
						case 'y':
							date = this.moveYear(date, dir);
							break;
					}
				}
				return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
			}
			var format = this.parseFormat(format),
				parts = date ? date.split(format.separator) : [],
				date = new Date(),
				val, filtered;
			date = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
			if (parts.length == format.parts.length) {
				for (var i=0, cnt = format.parts.length; i < cnt; i++) {
					val = parseInt(parts[i], 10)||1;
					switch(format.parts[i]) {
						case 'MM':
							filtered = $(this.getMonths(language)).filter(function(){
								var m = this.slice(0, parts[i].length),
									p = parts[i].slice(0, m.length);
								return m == p;
							});
							val = $.inArray(filtered[0], this.getMonths(language)) + 1;
							break;
						case 'M':
							filtered = $(this.getMonthsShort(language)).filter(function(){
								var m = this.slice(0, parts[i].length),
									p = parts[i].slice(0, m.length);
								return m == p;
							});
							val = $.inArray(filtered[0], this.getMonthsShort(language)) + 1;
							break;
					}
					switch(format.parts[i]) {
						case 'dd':
						case 'd':
							date.setDate(val);
							break;
						case 'mm':
						case 'm':
						case 'MM':
						case 'M':
							date.setMonth(val - 1);
							break;
						case 'yy':
							date.setFullYear(2000 + val);
							break;
						case 'yyyy':
							date.setFullYear(val);
							break;
					}
				}
			}
			return date;
		},
		formatDate: function(date, format, language){
			format = this.parseFormat(format);
			var val = {
				d: date.getDate(),
				m: date.getMonth() + 1,
				M: this.getMonthsShort(language)[date.getMonth()],
				MM: this.getMonths(language)[date.getMonth()],
				yy: date.getFullYear().toString().substring(2),
				yyyy: date.getFullYear()
			};
			val.dd = (val.d < 10 ? '0' : '') + val.d;
			val.mm = (val.m < 10 ? '0' : '') + val.m;
			var date = [];
			for (var i=0, cnt = format.parts.length; i < cnt; i++) {
				date.push(val[format.parts[i]]);
			}
			return date.join(format.separator);
		},
		moveMonth: function(date, dir){
			if (!dir) return date;
			var new_date = new Date(date.valueOf()),
				day = new_date.getDate(),
				month = new_date.getMonth(),
				mag = Math.abs(dir),
				new_month, test;
			dir = dir > 0 ? 1 : -1;
			if (mag == 1){
				test = dir == -1
					// If going back one month, make sure month is not current month
					// (eg, Mar 31 -> Feb 31 == Feb 28, not Mar 02)
					? function(){ return new_date.getMonth() == month; }
					// If going forward one month, make sure month is as expected
					// (eg, Jan 31 -> Feb 31 == Feb 28, not Mar 02)
					: function(){ return new_date.getMonth() != new_month; };
				new_month = month + dir;
				new_date.setMonth(new_month);
				// Dec -> Jan (12) or Jan -> Dec (-1) -- limit expected date to 0-11
				if (new_month < 0 || new_month > 11)
					new_month = (new_month + 12) % 12;
			} else {
				// For magnitudes >1, move one month at a time...
				for (var i=0; i<mag; i++)
					// ...which might decrease the day (eg, Jan 31 to Feb 28, etc)...
					new_date = this.moveMonth(new_date, dir);
				// ...then reset the day, keeping it in the new month
				new_month = new_date.getMonth();
				new_date.setDate(day);
				test = function(){ return new_month != new_date.getMonth(); };
			}
			// Common date-resetting loop -- if date is beyond end of month, make it
			// end of month
			while (test()){
				new_date.setDate(--day);
				new_date.setMonth(new_month);
			}
			return new_date;
		},
		moveYear: function(date, dir){
			return this.moveMonth(date, dir*12);
		}
	});
}(jQuery));