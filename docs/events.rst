Events
======

Datepicker triggers a number of events in certain circumstances.  All events have extra data attached to the event object that is passed to any event handlers::

    $('.datepicker').datepicker()
        .on(picker_event, function(e){
            # `e` here contains the extra attributes
        });

* ``date``: the relevant Date object, in local timezone.
* ``format([format])``: a function to make formatting ``date`` easier.  ``format`` can be any format string that datepicker supports.  If ``format`` is not given, the format set on the datepicker will be used.


show
----

Fired when the date picker is displayed.


hide
----

Fired when the date picker is hidden.


clearDate
---------

Fired when the date is cleared, normally when the "clear" button (enabled with the ``clearBtn`` option) is pressed.


changeDate
----------

Fired when the date is changed.


changeYear
----------

Fired when the *view* year is changed from decade view.

changeMonth
-----------

Fired when the *view* month is changed from year view.
