Methods
=======

Methods are called on a datepicker by call the ``datepicker`` function with a string first argument, followed by any arguments the method takes::

    $('.datepicker').datepicker('method', arg1, arg2);


remove
------

Arguments: None

Remove the datepicker.  Removes attached events, internal attached objects, and added HTML elements.


show
----

Arguments: None

Show the picker.


hide
----

Arguments: None

Hide the picker.


update
------

Arguments:

* date (String|Date, optional)

Update the datepicker with given argument or the current input value.

If ``date`` is provided and is a Date object, it is assumed to be a "local" date object, and will be converted to UTC for internal use.

::

    $('.datepicker').datepicker('update');
    $('.datepicker').datepicker('update', '2011-03-05');
    $('.datepicker').datepicker('update', new Date(2011, 2, 5));


setDate
-------

Arguments:

* date (Date)

Sets the internal date.  ``date`` is assumed to be a "local" date object, and will be converted to UTC for internal use.


setUTCDate
----------

Arguments:

* date (Date)

Sets the internal date.  ``date`` is assumed to be a UTC date object, and will not be converted.


getDate
-------

Arguments: None

Returns a localized date object representing the internal date object of the first datepicker in the selection.


setUTCDate
----------

Arguments: None

Returns the internal UTC date object, as-is and unconverted to local time, of the first datepicker in the selection.


setStartDate
------------

Arguments:

* startDate (Date)

Sets a new lower date limit on the datepicker.  See :ref:`startdate` for valid values.

Omit startDate (or provide an otherwise falsey value) to unset the limit.


setEndDate
----------

Arguments:

* endDate (Date)

Sets a new upper date limit on the datepicker.  See :ref:`enddate` for valid values.

Omit endDate (or provide an otherwise falsey value) to unset the limit.


setDaysOfWeekDisabled
---------------------

Arguments:

* daysOfWeekDisabled (String|Array)

Sets the days of week that should be disabled.  See :ref:`daysofweekdisabled` for valid values.

Omit daysOfWeekDisabled (or provide an otherwise falsey value) to unset the disabled days.
