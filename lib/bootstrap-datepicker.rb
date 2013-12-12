require "bootstrap/datepicker/version"

module Bootstrap
  module Datepicker
    def self.base_directory
      File.expand_path('../../compass', __FILE__)
    end
  end
end

Compass::Frameworks.register 'bootstrap-datepicker', :path => Bootstrap::Switch.base_directory
