/* =========================================================
 * bootstrap-datepicker.js
 * http://www.eyecon.ro/bootstrap-datepicker
 * =========================================================
 * Copyright 2012 Stefan Petre
 * Improvements by Andrew Rowls
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================= */

!function( $ ) {

	// Picker object

	var Datepicker = function(element, options){
		this.element = $(element);
		this.language = options.language in dates ? options.language : "en";
		this.format = DPGlobal.parseFormat(options.format||this.element.data('date-format')||'mm/dd/yyyy');
		this.picker = $(DPGlobal.template)
							.appendTo('body')
							.on({
								click: $.proxy(this.click, this),
								mousedown: $.proxy(this.mousedown, this)
							});
		this.isInput = this.element.is('input');
		this.component = this.element.is('.date') ? this.element.find('.add-on') : false;
		if(this.component && this.component.length === 0)
			this.component = false;

		if (this.isInput) {
			this.element.on({
				focus: $.proxy(this.show, this),
				blur: $.proxy(this._hide, this),
				keyup: $.proxy(this.update, this),
				keydown: $.proxy(this.keydown, this)
			});
		} else {
			if (this.component){
				this.component.on('click', $.proxy(this.show, this));
			} else {
				this.element.on('click', $.proxy(this.show, this));
			}
		}

		this.autoclose = false;
		if ('autoclose' in options) {
			this.autoclose = options.autoclose;
		} else if ('dateAutoclose' in this.element.data()) {
			this.autoclose = this.element.data('date-autoclose');
		}

		switch(options.startView){
			case 2:
			case 'decade':
				this.viewMode = this.startViewMode = 2;
				break;
			case 1:
			case 'year':
				this.viewMode = this.startViewMode = 1;
				break;
			case 0:
			case 'month':
			default:
				this.viewMode = this.startViewMode = 0;
				break;
		}

		this.weekStart = options.weekStart||this.element.data('date-weekstart')||dates[this.language].weekStart||0;
		this.weekEnd = this.weekStart == 0 ? 6 : this.weekStart - 1;
		this.startDate = -Infinity;
		this.endDate = Infinity;
		this.setStartDate(options.startDate||this.element.data('date-startdate'));
		this.setEndDate(options.endDate||this.element.data('date-enddate'));
		this.fillDow();
		this.fillMonths();
		this.update();
		this.showMode();
	};

	Datepicker.prototype = {
		constructor: Datepicker,

		show: function(e) {
			this.picker.show();
			this.height = this.component ? this.component.outerHeight() : this.element.outerHeight();
			this.place();
			$(window).on('resize', $.proxy(this.place, this));
			if (e ) {
				e.stopPropagation();
				e.preventDefault();
			}
			if (!this.isInput) {
				$(document).on('mousedown', $.proxy(this.hide, this));
			}
			this.element.trigger({
				type: 'show',
				date: this.date
			});
		},

		_hide: function(e){
			// When going from the input to the picker, IE handles the blur/click
			// events differently than other browsers, in such a way that the blur
			// event triggers a hide before the click event can stop propagation.
			if ($.browser.msie) {
				var t = this, args = arguments;

				function cancel_hide(){
					clearTimeout(hide_timeout);
					e.target.focus();
					t.picker.off('click', cancel_hide);
				}

				function do_hide(){
					t.hide.apply(t, args);
					t.picker.off('click', cancel_hide);
				}

				this.picker.on('click', cancel_hide);
				var hide_timeout = setTimeout(do_hide, 100);
			} else {
				return this.hide.apply(this, arguments);
			}
		},

		hide: function(e){
			this.picker.hide();
			$(window).off('resize', this.place);
			this.viewMode = this.startViewMode;
			this.showMode();
			if (!this.isInput) {
				$(document).off('mousedown', this.hide);
			}
			if (e && e.currentTarget.value)
				this.setValue();
			this.element.trigger({
				type: 'hide',
				date: this.date
			});
		},

		setValue: function() {
			var formated = DPGlobal.formatDate(this.date, this.format, this.language);
			if (!this.isInput) {
				if (this.component){
					this.element.find('input').prop('value', formated);
				}
				this.element.data('date', formated);
			} else {
				this.element.prop('value', formated);
			}
		},

		setStartDate: function(startDate){
			this.startDate = startDate||-Infinity;
			if (this.startDate !== -Infinity) {
				this.startDate = DPGlobal.parseDate(this.startDate, this.format, this.language);
			}
			this.update();
			this.updateNavArrows();
		},

		setEndDate: function(endDate){
			this.endDate = endDate||Infinity;
			if (this.endDate !== Infinity) {
				this.endDate = DPGlobal.parseDate(this.endDate, this.format, this.language);
			}
			this.update();
			this.updateNavArrows();
		},

		place: function(){
			var offset = this.component ? this.component.offset() : this.element.offset();
			this.picker.css({
				top: offset.top + this.height,
				left: offset.left
			});
		},

		update: function(){
			this.date = DPGlobal.parseDate(
				this.isInput ? this.element.prop('value') : this.element.data('date'),
				this.format, this.language
			);
			if (this.date < this.startDate) {
				this.viewDate = new Date(this.startDate);
			} else if (this.date > this.endDate) {
				this.viewDate = new Date(this.endDate);
			} else {
				this.viewDate = new Date(this.date);
			}
			this.fill();
		},

		fillDow: function(){
			var dowCnt = this.weekStart;
			var html = '<tr>';
			while (dowCnt < this.weekStart + 7) {
				html += '<th class="dow">'+dates[this.language].daysMin[(dowCnt++)%7]+'</th>';
			}
			html += '</tr>';
			this.picker.find('.datepicker-days thead').append(html);
		},

		fillMonths: function(){
			var html = '';
			var i = 0
			while (i < 12) {
				html += '<span class="month">'+dates[this.language].monthsShort[i++]+'</span>';
			}
			this.picker.find('.datepicker-months td').html(html);
		},

		fill: function() {
			var d = new Date(this.viewDate),
				year = d.getFullYear(),
				month = d.getMonth(),
				startYear = this.startDate !== -Infinity ? this.startDate.getFullYear() : -Infinity,
				startMonth = this.startDate !== -Infinity ? this.startDate.getMonth() : -Infinity,
				endYear = this.endDate !== Infinity ? this.endDate.getFullYear() : Infinity,
				endMonth = this.endDate !== Infinity ? this.endDate.getMonth() : Infinity,
				currentDate = this.date.valueOf();
			this.picker.find('.datepicker-days th:eq(1)')
						.text(dates[this.language].months[month]+' '+year);
			this.updateNavArrows();
			this.fillMonths();
			var prevMonth = new Date(year, month-1, 28,0,0,0,0),
				day = DPGlobal.getDaysInMonth(prevMonth.getFullYear(), prevMonth.getMonth());
			prevMonth.setDate(day);
			prevMonth.setDate(day - (prevMonth.getDay() - this.weekStart + 7)%7);
			var nextMonth = new Date(prevMonth);
			nextMonth.setDate(nextMonth.getDate() + 42);
			nextMonth = nextMonth.valueOf();
			html = [];
			var clsName;
			while(prevMonth.valueOf() < nextMonth) {
				if (prevMonth.getDay() == this.weekStart) {
					html.push('<tr>');
				}
				clsName = '';
				if (prevMonth.getFullYear() < year || (prevMonth.getFullYear() == year && prevMonth.getMonth() < month)) {
					clsName += ' old';
				} else if (prevMonth.getFullYear() > year || (prevMonth.getFullYear() == year && prevMonth.getMonth() > month)) {
					clsName += ' new';
				}
				if (prevMonth.valueOf() == currentDate) {
					clsName += ' active';
				}
				if (prevMonth.valueOf() < this.startDate || prevMonth.valueOf() > this.endDate) {
					clsName += ' disabled';
				}
				html.push('<td class="day'+clsName+'">'+prevMonth.getDate() + '</td>');
				if (prevMonth.getDay() == this.weekEnd) {
					html.push('</tr>');
				}
				prevMonth.setDate(prevMonth.getDate()+1);
			}
			this.picker.find('.datepicker-days tbody').empty().append(html.join(''));
			var currentYear = this.date.getFullYear();

			var months = this.picker.find('.datepicker-months')
						.find('th:eq(1)')
							.text(year)
							.end()
						.find('span').removeClass('active');
			if (currentYear == year) {
				months.eq(this.date.getMonth()).addClass('active');
			}
			if (year < startYear || year > endYear) {
				months.addClass('disabled');
			}
			if (year == startYear) {
				months.slice(0, startMonth).addClass('disabled');
			}
			if (year == endYear) {
				months.slice(endMonth+1).addClass('disabled');
			}

			html = '';
			year = parseInt(year/10, 10) * 10;
			var yearCont = this.picker.find('.datepicker-years')
								.find('th:eq(1)')
									.text(year + '-' + (year + 9))
									.end()
								.find('td');
			year -= 1;
			for (var i = -1; i < 11; i++) {
				html += '<span class="year'+(i == -1 || i == 10 ? ' old' : '')+(currentYear == year ? ' active' : '')+(year < startYear || year > endYear ? ' disabled' : '')+'">'+year+'</span>';
				year += 1;
			}
			yearCont.html(html);
		},

		updateNavArrows: function() {
			var d = new Date(this.viewDate),
				year = d.getFullYear(),
				month = d.getMonth();
			switch (this.viewMode) {
				case 0:
					if (this.startDate !== -Infinity && year <= this.startDate.getFullYear() && month <= this.startDate.getMonth()) {
						this.picker.find('.prev').css({visibility: 'hidden'});
					} else {
						this.picker.find('.prev').css({visibility: 'visible'});
					}
					if (this.endDate !== Infinity && year >= this.endDate.getFullYear() && month >= this.endDate.getMonth()) {
						this.picker.find('.next').css({visibility: 'hidden'});
					} else {
						this.picker.find('.next').css({visibility: 'visible'});
					}
					break;
				case 1:
				case 2:
					if (this.startDate !== -Infinity && year <= this.startDate.getFullYear()) {
						this.picker.find('.prev').css({visibility: 'hidden'});
					} else {
						this.picker.find('.prev').css({visibility: 'visible'});
					}
					if (this.endDate !== Infinity && year >= this.endDate.getFullYear()) {
						this.picker.find('.next').css({visibility: 'hidden'});
					} else {
						this.picker.find('.next').css({visibility: 'visible'});
					}
					break;
			}
		},

		click: function(e) {
			e.stopPropagation();
			e.preventDefault();
			var target = $(e.target).closest('span, td, th');
			if (target.length == 1) {
				switch(target[0].nodeName.toLowerCase()) {
					case 'th':
						switch(target[0].className) {
							case 'switch':
								this.showMode(1);
								break;
							case 'prev':
							case 'next':
								var dir = DPGlobal.modes[this.viewMode].navStep * (target[0].className == 'prev' ? -1 : 1);
								switch(this.viewMode){
									case 0:
										this.viewDate = this.moveMonth(this.viewDate, dir);
										break;
									case 1:
									case 2:
										this.viewDate = this.moveYear(this.viewDate, dir);
										break;
								}
								this.fill();
								break;
						}
						break;
					case 'span':
						if (!target.is('.disabled')) {
							if (target.is('.month')) {
								var month = target.parent().find('span').index(target);
								this.viewDate.setMonth(month);
							} else {
								var year = parseInt(target.text(), 10)||0;
								this.viewDate.setFullYear(year);
							}
							this.showMode(-1);
							this.fill();
						}
						break;
					case 'td':
						if (target.is('.day') && !target.is('.disabled')){
							var day = parseInt(target.text(), 10)||1;
							var year = this.viewDate.getFullYear(),
								month = this.viewDate.getMonth();
							if (target.is('.old')) {
								if (month == 0) {
									month = 11;
									year -= 1;
								} else {
									month -= 1;
								}
							} else if (target.is('.new')) {
								if (month == 11) {
									month = 0;
									year += 1;
								} else {
									month += 1;
								}
							}
							this.date = new Date(year, month, day,0,0,0,0);
							this.viewDate = new Date(year, month, day,0,0,0,0);
							this.fill();
							this.setValue();
							this.element.trigger({
								type: 'changeDate',
								date: this.date
							});
							var element;
							if (this.isInput) {
								element = this.element;
							} else if (this.component){
								element = this.element.find('input');
							}
							if (element) {
								element.change();
								if (this.autoclose) {
									element.blur();
								}
							}
						}
						break;
				}
			}
		},

		mousedown: function(e){
			e.stopPropagation();
			e.preventDefault();
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
		},

		keydown: function(e){
			if (this.picker.is(':not(:visible)')){
				if (e.keyCode == 27) // allow escape to hide and re-show picker
					this.show();
				return;
			}
			var dir, day, month;
			switch(e.keyCode){
				case 27: // escape
					this.hide();
					e.preventDefault();
					break;
				case 37: // left
				case 39: // right
					dir = e.keyCode == 37 ? -1 : 1;
					if (e.ctrlKey){
						this.date = this.moveYear(this.date, dir);
						this.viewDate = this.moveYear(this.viewDate, dir);
					} else if (e.shiftKey){
						this.date = this.moveMonth(this.date, dir);
						this.viewDate = this.moveMonth(this.viewDate, dir);
					} else {
						this.date.setDate(this.date.getDate() + dir);
						this.viewDate.setDate(this.viewDate.getDate() + dir);
					}
					this.setValue();
					this.update();
					e.preventDefault();
					break;
				case 38: // up
				case 40: // down
					dir = e.keyCode == 38 ? -1 : 1;
					if (e.ctrlKey){
						this.date = this.moveYear(this.date, dir);
						this.viewDate = this.moveYear(this.viewDate, dir);
					} else if (e.shiftKey){
						this.date = this.moveMonth(this.date, dir);
						this.viewDate = this.moveMonth(this.viewDate, dir);
					} else {
						this.date.setDate(this.date.getDate() + dir * 7);
						this.viewDate.setDate(this.viewDate.getDate() + dir * 7);
					}
					this.setValue();
					this.update();
					e.preventDefault();
					break;
				case 13: // enter
					this.hide();
					e.preventDefault();
					break;
			}
		},

		showMode: function(dir) {
			if (dir) {
				this.viewMode = Math.max(0, Math.min(2, this.viewMode + dir));
			}
			this.picker.find('>div').hide().filter('.datepicker-'+DPGlobal.modes[this.viewMode].clsName).show();
			this.updateNavArrows();
		}
	};

	$.fn.datepicker = function ( option ) {
		var args = Array.apply(null, arguments);
		args.shift();
		return this.each(function () {
			var $this = $(this),
				data = $this.data('datepicker'),
				options = typeof option == 'object' && option;
			if (!data) {
				$this.data('datepicker', (data = new Datepicker(this, $.extend({}, $.fn.datepicker.defaults,options))));
			}
			if (typeof option == 'string') data[option].apply(data, args);
		});
	};

	$.fn.datepicker.defaults = {
	};
	$.fn.datepicker.Constructor = Datepicker;
	var dates = $.fn.datepicker.dates = {
		en: {
			days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
			daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
			daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
			months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
			monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
		}
	}

	var DPGlobal = {
		modes: [
			{
				clsName: 'days',
				navFnc: 'Month',
				navStep: 1
			},
			{
				clsName: 'months',
				navFnc: 'FullYear',
				navStep: 1
			},
			{
				clsName: 'years',
				navFnc: 'FullYear',
				navStep: 10
		}],
		isLeapYear: function (year) {
			return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0))
		},
		getDaysInMonth: function (year, month) {
			return [31, (DPGlobal.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month]
		},
		validParts: /dd?|mm?|MM?|yy(?:yy)?/g,
		nonpunctuation: /[^ -\/:-@\[-`{-~\t\n\r]+/g,
		parseFormat: function(format){
			var separators = format.split(this.validParts),
				parts = format.match(this.validParts);
			if (!separators || !separators.length || !parts || parts.length == 0){
				throw new Error("Invalid date format.");
			}
			return {separators: separators, parts: parts};
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
							date = Datepicker.prototype.moveMonth.call(Datepicker.prototype, date, dir);
							break;
						case 'w':
							date.setDate(date.getDate() + dir * 7);
							break;
						case 'y':
							date = Datepicker.prototype.moveYear.call(Datepicker.prototype, date, dir);
							break;
					}
				}
				return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
			}
			var parts = date ? date.match(this.nonpunctuation) : [],
				date = new Date(),
				val, filtered;
			date = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
			if (parts.length == format.parts.length) {
				for (var i=0, cnt = format.parts.length; i < cnt; i++) {
					val = parseInt(parts[i], 10)||1;
					switch(format.parts[i]) {
						case 'MM':
							filtered = $(dates[language].months).filter(function(){
								var m = this.slice(0, parts[i].length),
									p = parts[i].slice(0, m.length);
								return m == p;
							});
							val = $.inArray(filtered[0], dates[language].months) + 1;
							break;
						case 'M':
							filtered = $(dates[language].monthsShort).filter(function(){
								var m = this.slice(0, parts[i].length),
									p = parts[i].slice(0, m.length);
								return m == p;
							});
							val = $.inArray(filtered[0], dates[language].monthsShort) + 1;
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
			var val = {
				d: date.getDate(),
				m: date.getMonth() + 1,
				M: dates[language].monthsShort[date.getMonth()],
				MM: dates[language].months[date.getMonth()],
				yy: date.getFullYear().toString().substring(2),
				yyyy: date.getFullYear()
			};
			val.dd = (val.d < 10 ? '0' : '') + val.d;
			val.mm = (val.m < 10 ? '0' : '') + val.m;
			var date = [],
				seps = $.extend([], format.separators);
			for (var i=0, cnt = format.parts.length; i < cnt; i++) {
				if (seps.length)
					date.push(seps.shift())
				date.push(val[format.parts[i]]);
			}
			return date.join('');
		},
		headTemplate: '<thead>'+
							'<tr>'+
								'<th class="prev"><i class="icon-arrow-left"/></th>'+
								'<th colspan="5" class="switch"></th>'+
								'<th class="next"><i class="icon-arrow-right"/></th>'+
							'</tr>'+
						'</thead>',
		contTemplate: '<tbody><tr><td colspan="7"></td></tr></tbody>'
	};
	DPGlobal.template = '<div class="datepicker dropdown-menu">'+
							'<div class="datepicker-days">'+
								'<table class=" table-condensed">'+
									DPGlobal.headTemplate+
									'<tbody></tbody>'+
								'</table>'+
							'</div>'+
							'<div class="datepicker-months">'+
								'<table class="table-condensed">'+
									DPGlobal.headTemplate+
									DPGlobal.contTemplate+
								'</table>'+
							'</div>'+
							'<div class="datepicker-years">'+
								'<table class="table-condensed">'+
									DPGlobal.headTemplate+
									DPGlobal.contTemplate+
								'</table>'+
							'</div>'+
						'</div>';

}( window.jQuery )
