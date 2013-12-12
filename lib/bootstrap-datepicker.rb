require "bootstrap-datepicker/version"

module Bootstrap
  module Datepicker
    def self.base_directory
      File.expand_path('../../compass', __FILE__)
    end
  end
end

require "bootstrap-sass"

Compass::Frameworks.register 'bootstrap-datepicker', :path => Bootstrap::Datepicker.base_directory
