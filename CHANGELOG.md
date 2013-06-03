Changelog
=========

1.1.1
----------

Fixes a bug when setting startDate or endDate during initialization.


1.1.0
----------

New features:
* Date range picker.
* Data API / noConflict.
* `getDate` and `setDate` methods.
* `format` method for events; this allows you to easily format the `date` associated with the event.
* New options:
  * `beforeShowDay` option: a dev-provided function that can enable/disable dates, add css classes, and add tooltips.
  * `clearBtn`, a button for resetting the picker.

Internal changes:
* Cleaner and more reliable method for extracting options from all potential sources (defaults, locale overrides, data-attrs, and instantiation options, in that order).  This also populates `$.fn.datepicker.defaults` with the default values, and uses this hash as the actual source of defaults, meaning you can globally change the default value for a given option.

Bugs squashed:
* Resolved a conflict with bootstrap's native `.switch` class.
* Fixed a bug with components where they would be stuck with a stale value when editing the value manually.
* The `date` attributes on events are now local dates instead of internal UTC dates.
* Separate `Date` objects for internal selected and view date references.
* Clicking multiple times inside inputs no longer hides the picker.

Minor improvements:
* Better text color for highlighted "today" date.
* Last year in decade view now marked as "new" instead of "old".
* Formats now properly handle trailing separators.

Locale changes:
* Added Albanian, Estonian, and Macedonian
* Added `weekStart` for Russian
* Added `weekStart` and `format` for Finnish

Potentially backward-incompatible changes:
* Options revamp:
  * This fixes bugs in the correlation of some data-attrs to their associated option names.  If you use `data-date-weekstart`, `data-date-startdate`, or `data-date-enddate`, you should update these to `data-date-week-start`, `data-date-start-date`, or `data-date-end-date`, respectively.
  * All options for datepicker are now properties on the datepicker's `o` property; options are no longer stored on the Datepicker instance itself.  If you have code that accesses options stored on the datepicker instance (eg, `datepicker.format`), you will need to update it to access those options via the `o` property (eg, `datepicker.o.format`).  "Raw" options are available via the `_o` property.

1.0.2
----------

Small optimizations release

* Reduced the number of times `update` is called on initialization.
* Datepicker now detaches the picker dropdown when it is hidden, and appends it when shown.  This removes the picker from the DOM when it is not in use.
* No longer listens to document/window events unless picker is visible.

v1.0.1
------

* Support for [Bower](http://twitter.github.com/bower/)
* Component pickers are now aligned under the input, not the add-on element.
* Japanese locale now has "today" and "format".
* "remove" method removes `.data().date` if the datepicker is on a non-input.
* Events on initialized elements are no longer blocked from bubbling up the DOM (jQuery.live et al can now catch the events).
* Component triggers now include `.btn` in addition to `.add-on`.
* Updates to README contents.

v1.0.0
------

Initial release:

* format option
* weekStart option
* calendarWeeks option
* startDate / endDate options
* daysOfWeekDisabled option
* autoclose option
* startView / mnViewMode options
* todayBtn / todayHighlight options
* keyboardNavigation option
* language option
* forceParse option
