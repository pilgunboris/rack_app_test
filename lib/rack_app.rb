require 'erb'
require 'pry'

module RackApp
  class Racker
    include RackApp::AppController

    def self.call(env)
      new(env).response.finish
    end

    def initialize(env)
      @request = Rack::Request.new(env)
    end

    def render(template)
      path = File.expand_path("public/views/#{template}")
      ERB.new(File.read(path)).result(binding)
    end

    # def render_in_app_layout(template)
    #   layout_path = File.expand_path("public/views/app_layout.html.erb")
    #   template_path = File.expand_path("public/views/#{template}")
    #   ERB.new(File.read(layout_path)).result(binding) do
    #     ERB.new(File.read(layout_path)).result(binding)
    #   end
    # end
  end
end
