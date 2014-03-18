Markup
=======

The following are examples of supported markup.  On their own, these will not provide a datepicker widget; you will need to instantiate the datepicker on the markup.


input
-----

The simplest case: focusing the input (clicking or tabbing into it) will show the picker.

.. code-block:: html

    <input value="02-16-2012">

component
---------

Adding the ``date`` class to an ``input-append`` or ``input-prepend`` bootstrap component will allow the ``add-on`` elements to trigger the picker.

.. code-block:: html

    <div class="input-append date">
        <input value="12-02-2012">
        <span class="add-on"><i class="icon-th"></i></span>
    </div>


date-range
----------

Using the ``input-daterange`` construct with multiple child inputs will instantiate one picker per input and link them together to allow selecting ranges.

.. code-block:: html

    <div class="input-daterange">
        <input value="2012-04-05" />
        <span class="add-on">to</span>
        <input value="2012-04-07" />
    </div>


inline or embedded
------------------

Instantiating the datepicker on a simple div will give an embedded picker that is always visible.

.. code-block:: html

    <div></div>
    
    
inline or embedded date-range
-----------------------------

Instantiating the datepicker is almost the same as a date range, but you'll need to set the ``inputs`` manually

.. code-block:: html

    <div class="range">
        <div class="range-start"></div>
        <div class="range-end"></div>
    </div>
    
.. code-block:: javascript

    // Instantiate
    $('.range').datepicker({
        inputs: $('.range-start, .range-end')
    });
    
    // Manipulate dates
    $('.range-start').datepicker('update', new Date(2013,1,1));
    $('.range-end').datepicker('update', new Date(2013,5,1));

    // Update the range (you have to fire this manually)
    $('.range').datepicker('updateDates');
