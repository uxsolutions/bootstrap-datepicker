# coding: utf-8
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'bootstrap-datepicker/version'

Gem::Specification.new do |spec|
  spec.name          = "bootstrap-datepicker"
  spec.version       = Bootstrap::Datepicker::VERSION
  spec.authors       = ["Michael Hellein"]
  spec.email         = ["michael.hellein@dealer.com"]
  spec.description   = "A datepicker for Bootstrap."
  spec.summary       = "A datepicker for Bootstrap."
  spec.homepage      = ""
  spec.license       = "Apache Version 2.0"

  spec.files         = `git ls-files`.split($/)
  spec.executables   = spec.files.grep(%r{^bin/}) { |f| File.basename(f) }
  spec.test_files    = spec.files.grep(%r{^(test|spec|features)/})
  spec.require_paths = ["lib"]

  spec.add_dependency "compass", ">= 0.11"
  spec.add_dependency "bootstrap-sass", "~> 2.3"

  spec.add_development_dependency "bundler", "~> 1.3"
  spec.add_development_dependency "rake"
end
