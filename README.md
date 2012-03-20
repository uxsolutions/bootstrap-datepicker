# Home

http://www.eyecon.ro/bootstrap-datepicker/

# Example

Attached to a field with the format specified via options:

    <input type="text" value="02-16-2012" id="datepicker">  
######
    $('#datepicker').datepicker({
        format: 'mm-dd-yyyy'
    });

Attached to a field with the format specified via data tag:

    <input type="text" value="02/16/12" data-date-format="mm/dd/yy" id="datepicker" >
######
    $('#datepicker').datepicker();

As component:

    <div class="input-append date" id="datepicker" data-date="12-02-2012" data-date-format="dd-mm-yyyy">
        <input size="16" type="text" value="12-02-2012" readonly>
        <span class="add-on"><i class="icon-th"></i></span>
    </div>
######
    $('#datepicker').datepicker();

Attached to non-field element, using events to work with the date values.

    <div class="alert alert-error" id="alert">
        <strong>Oh snap!</strong>
    </div>
    <table class="table">
        <thead>
            <tr>
              <th>
                  Start date
                  <a href="#" class="btn small" id="date-start" data-date-format="yyyy-mm-dd" data-date="2012-02-20">Change</a>
              </th>
              <th>
                  End date
                  <a href="#" class="btn small" id="date-end" data-date-format="yyyy-mm-dd" data-date="2012-02-25">Change</a>
              </th>
            </tr>
        </thead>
        <tbody>
            <tr>
              <td id="date-start-display">2012-02-20</td>
              <td id="date-end-display">2012-02-25</td>
            </tr>
        </tbody>
    </table>
######
    var startDate = new Date(2012,1,20);
    var endDate = new Date(2012,1,25);
    $('#date-start')
        .datepicker()
        .on('changeDate', function(ev){
            if (ev.date.valueOf() > endDate.valueOf()){
                $('#alert').show().find('strong').text('The start date must be before the end date.');
            } else {
                $('#alert').hide();
                startDate = new Date(ev.date);
                $('#date-start-display').text($('#date-start').data('date'));
            }
            $('#date-start').datepicker('hide');
        });
    $('#date-end')
        .datepicker()
        .on('changeDate', function(ev){
            if (ev.date.valueOf() < startDate.valueOf()){
                $('#alert').show().find('strong').text('The end date must be after the start date.');
            } else {
                $('#alert').hide();
                endDate = new Date(ev.date);
                $('#date-end-display').text($('#date-end').data('date'));
            }
            $('#date-end').datepicker('hide');
        });
    });


# Using bootstrap-datepicker.js

Call the datepicker via javascript:

    $('.datepicker').datepicker()

## Options

### format

String.  Default: 'mm/dd/yyyy'

The date format, combination of d, dd, m, mm, M, MM, yy, yyy.

### weekStart

Integer.  Default: 0

Day of the week start. 0 (Sunday) to 6 (Saturday)

### startDate

String.  Default: Beginning of time

The earliest date that may be selected; all earlier dates will be disabled.

### endDate

String.  Default: End of time

The latest date that may be selected; all later dates will be disabled.

### autoclose

Boolean.  Default: false

Whether or not to close the datepicker immediately when a date is selected.

## Markup

Format a component.

    <div class="input-append date" id="datepicker" data-date="12-02-2012" data-date-format="dd-mm-yyyy">
        <input class="span2" size="16" type="text" value="12-02-2012">
        <span class="add-on"><i class="icon-th"></i></span>
    </div>

## Methods

### .datepicker(options)

Initializes an datepicker.

### show

Arguments: None

Show the datepicker.

    $('#datepicker').datepicker('show');

### hide

Arguments: None

Hide the datepicker.

    $('#datepicker').datepicker('hide');

### update

Arguments: None

Update the datepicker with the current input value.

    $('#datepicker').datepicker('update');

### setStartDate

Arguments:

* startDate (String)

Sets a new lower date limit on the datepicker.

    $('#datepicker').datepicker('setStartDate', '2012-01-01');

Omit startDate (or provide an otherwise falsey value) to unset the limit.

    $('#datepicker').datepicker('setStartDate');
    $('#datepicker').datepicker('setStartDate', null);

### setEndDate

Arguments:

* endDate (String)

Sets a new upper date limit on the datepicker.

    $('#datepicker').datepicker('setEndDate', '2012-12-31');

Omit endDate (or provide an otherwise falsey value) to unset the limit.

    $('#datepicker').datepicker('setEndDate');
    $('#datepicker').datepicker('setEndDate', null);

## Events

Datepicker class exposes a few events for manipulating the dates.

### show

Fired when the date picker is displayed.

### hide

Fired when the date picker is hidden.

### changeDate

Fired when the date is changed.

    $('#date-end')
        .datepicker()
        .on('changeDate', function(ev){
            if (ev.date.valueOf() < date-start-display.valueOf()){
                ....
            }
        });

