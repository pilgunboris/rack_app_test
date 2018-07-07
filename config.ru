require 'json'
require 'codebreaker'
Dir["./lib/rack_app/**/*.rb"].each {|file| require file }
require './lib/rack_app'

use Rack::Static, urls: ['/stylesheets'], root: 'public'
use Rack::Static, urls: ['/js'], root: 'public'
use Rack::Static, urls: ['/images'], root: 'public'
run RackApp::Racker


