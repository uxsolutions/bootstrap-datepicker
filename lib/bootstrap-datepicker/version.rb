module Bootstrap
  module Datepicker
    # This is updated via the `grunt bump` command, which has a pretty 
    # unflexible matching syntax.
    VERSION_STRING = "'version': '1.1.1'"
    # Then, just the version.
    VERSION = VERSION_STRING.match(/\d+\.\d+\.\d+/)[0]
  end
end
