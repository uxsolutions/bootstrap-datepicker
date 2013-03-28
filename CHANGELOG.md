Changelog
=========

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
