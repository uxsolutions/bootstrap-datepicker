var page = {bootstrap: 3};
function swap_bs(){
  var bscss = $('#bs-css'),
      bsdpcss = $('#bsdp-css');
  if (page.bootstrap == 3){
    bscss.prop('href', 'https://netdna.bootstrapcdn.com/twitter-bootstrap/2.3.2/css/bootstrap-combined.min.css');
    bsdpcss.prop('href', 'https://unpkg.com/bootstrap-datepicker@1.9.0/css/bootstrap-datepicker.min.css');
    page.bootstrap = 2;

    ga('send', 'event', 'Sandbox', 'Bootstrap V2 style');
  } else{
    bscss.prop('href', 'https://netdna.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css');
    bsdpcss.prop('href', 'https://unpkg.com/bootstrap-datepicker@1.9.0/css/bootstrap-datepicker3.min.css');
    page.bootstrap = 3;

    ga('send', 'event', 'Sandbox', 'Bootstrap V3 style');
  }

  $(page).trigger('change:bootstrap', page.bootstrap);
}

$(function(){
  var defaults = {},
      defaults_form = $('<form>', {html: $('.sandbox-form').html()})
  $.each(defaults_form.serializeArray(), function(i,e){
    if (e.name in defaults)
      defaults[e.name] += ',' + e.value;
    else
      defaults[e.name] = e.value;
  });
  delete defaults.markup;

  function fix_indent(s){
    var lines = s.split(/\r?\n/g);
    while (/^\s*$/.test(lines[0])) lines.shift();
    while (/^\s*$/.test(lines[lines.length-1])) lines.pop();
    var indent = /^\s*/.exec(lines[0])[0],
        deindent = new RegExp('^' + indent);
    for (var i=0; i<lines.length; i++)
      lines[i] = lines[i].replace(deindent, '');
    return lines.join('\n');
  }

  function build_code(){
    var form = $('.sandbox-form'),
        values = {};
    $.each(form.serializeArray(), function(i,e){
      if (e.name in values)
        values[e.name] += ',' + e.value;
      else
        values[e.name] = e.value;
    });

    var html_el = $('[name=markup][value='+values.markup+']').siblings('script.html').filter('[data-version="' + page.bootstrap + '"], [data-version="*"]');
    var html = fix_indent(html_el.html());
    var selector_el = $('[name=markup][value='+values.markup+']').siblings('script.selector').filter('[data-version="' + page.bootstrap + '"], [data-version="*"]');
    var selector = selector_el.html().replace(/^\s+|\s+$/g, '');
    delete values.markup;

    var js = "$('#sandbox-container "+selector+"').datepicker({\n",
        val;
    for (var opt in $.extend({}, defaults, values)){
      if (values[opt] != defaults[opt]){
        val = values[opt];
        if (opt == 'daysOfWeekDisabled' || opt == 'daysOfWeekHighlighted') val = '"'+val+'"'
        else if (opt == 'beforeShowDay') val = function(date){
          if (date.getMonth() == (new Date()).getMonth())
            switch (date.getDate()){
              case 4:
                return {
                  tooltip: 'Example tooltip',
                  classes: 'active'
                };
              case 8:
                return false;
              case 12:
                return "green";
          }
        }
        else if (opt == 'beforeShowMonth') val = function(date){
          if (date.getMonth() == 8) {
            return false;
          }
        }
        else if (opt == 'beforeShowYear') val = function(date){
          if (date.getFullYear() == 2007) {
            return false;
          }
        }
        else if (opt == 'datesDisabled'){
          var date = new Date();
          var month = date.getMonth() + 1;
          if (month.toString().length == 1) {
              month = "0" + month;
          }
          val = "['"+month+"/06/"+date.getFullYear()+"', '"+month+"/21/"+date.getFullYear()+"']";
        }
        else if (opt === 'defaultViewDate') val = '{ year: 1977, month: 04, day: 25 }';
        else if (val == 'on' || val == 'true') val = 'true';
        else if (val === void 0 || val == 'false') val = 'false';
        else if (parseInt(val) == val) val = val;
        else val = '"'+val+'"'
        js += "    " + opt + ": " + val + ",\n"
      }
    }
    if (js.slice(-2) == ",\n")
      js = js.slice(0,-2) + "\n";
    js += "});";

    return [html, js];
  }
  function update_code(){
    var code = build_code(),
        html = code[0],
        js = code[1];

    var print_html = html.replace(/</g, '&lt;').replace(/>/g, '&gt;')
    $('#sandbox-html').html(prettyPrintOne(print_html, 'html', true));
    $('#sandbox-js').html(prettyPrintOne(js, 'js', true));
  }
  function update_sandbox(){
    var code = build_code(),
        html = code[0],
        js = code[1];

    $('#sandbox-container > :first-child').datepicker('destroy');
    $('#sandbox-container').html(html);
    eval(js);
  }
  function update_url(){
    if (history.replaceState){
      var query = '?' + $('.sandbox-form').serialize();
      history.replaceState(null, null, query + '#sandbox');
    }
  }
  function update_all(){
    update_code();
    update_sandbox();
    update_url();
  }

  $('.sandbox-form')
    .submit(function(){ return false; })
    .keydown(update_all)
    .keyup(update_all)
    .click(function(e){
      update_code();
      update_sandbox();
      if (!$(e.target).is('button[type=reset]'))
        update_url();
    });

  $('.sandbox-form button[type=reset]').click(function(){
    $('.sandbox-form')[0].reset();
    update_code();
    update_sandbox();
    history.replaceState && history.replaceState(null, null, '?#sandbox');
  });

  $(page).on('change:bootstrap', function(e, version){
    $('#ch_bs').text('Switch to Bootstrap ' + (5-version));
  });
  $('#ch_bs').click(function(){
    swap_bs();
  });

  $(page).on('change:bootstrap', update_all);

  setTimeout(function(){
    // Load form state from url if possible
    var search = document.location.search.replace(/^\?/, '');
    if (search){
      search = search.split('&');
      var values = {};
      for (var i=0, opt, val; i<search.length; i++){
        opt = search[i].split('=')[0];
        val = search[i].split('=')[1];
        if (opt in values)
          values[opt] += ',' + val;
        else
          values[opt] = val;
      }

      for (var opt in $.extend({}, defaults, values)){
        var el = $('[name='+opt+']'),
            val = unescape(values[opt]);
        if (el.is(':checkbox')){
          if (el.length > 1){
            var vals = val.split(',');
            $('[name='+opt+']').prop('checked', false);
            for (var i=0; i<vals.length; i++)
              $('[name='+opt+'][value='+vals[i]+']').prop('checked', true);
          }
          else if (val === 'undefined')
            el.prop('checked', false);
          else
            el.prop('checked', true);
        }
        else if (el.is(':radio')){
          el.filter('[value='+val+']').prop('checked', true);
        }
        else
          el.val(val);
      }
    }

    // Don't replaceState the url on pageload
    update_code();
    update_sandbox();
  }, 300);

  // Analytics event tracking
  // What options are people interested in?
  $('.sandbox-form input, .sandbox-form select').change(function(e){
    var $this = $(this),
        val, opt;
    opt = $this.attr('name');
    val = $this.val();
    if ($this.is(':checkbox') && val == 'on')
      val = $this.is(':checked') ? "on" : "off";
    ga('send', 'event', 'Sandbox', 'Option Selected', 'Option: ' + opt, val);
  });
  // Do they even use the reset button?
  $('.sandbox-form button[type=reset]').click(function(){
    ga('send', 'event', 'Sandbox', 'Reset');
  });

  var flag=0, mousedown=false, delta=0, x=0, y=0, dx, dy;
  // How do they interact with the HTML display?  Do they select
  // the code, do they try to edit it (I'd want to!)?
  $("#sandbox-html").mousedown(function(e){
    mousedown = true;
    delta = 0; x=e.clientX; y=e.clientY;
  });
  $("#sandbox-html").mousemove(function(e){
    if (mousedown){
      dx = Math.abs(e.clientX-x);
      dy = Math.abs(e.clientY-y);
      delta = Math.max(dx, dy);
    }
  });
  $("#sandbox-html").mouseup(function(){
    if(delta <= 10)
      ga('send', 'event', 'Sandbox', 'HTML Clicked');
    else
      ga('send', 'event', 'Sandbox', 'HTML Selected');
    delta = 0;
    mousedown = false;
  });

  // How do they interact with the JS display?  Do they select
  // the code, do they try to edit it (I'd want to!)?
  $("#sandbox-js").mousedown(function(e){
    mousedown = true;
    delta = 0; x=e.clientX; y=e.clientY;
  });
  $("#sandbox-js").mousemove(function(e){
    if (mousedown){
      dx = Math.abs(e.clientX-x);
      dy = Math.abs(e.clientY-y);
      delta = Math.max(dx, dy);
    }
  });
  $("#sandbox-js").mouseup(function(){
    if(delta <= 10)
      ga('send', 'event', 'Sandbox', 'JS Clicked');
    else
      ga('send', 'event', 'Sandbox', 'JS Selected');
    delta = 0;
    mousedown = false;
  });


  $(page).trigger('change:bootstrap', page.bootstrap)
});
