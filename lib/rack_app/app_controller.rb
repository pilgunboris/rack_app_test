module RackApp
  module AppController
    def response
      if @request.post?
        case @request.path
        when '/run'
          run
        end
      else
        case @request.path
        when '/'
          # start 'new game' # reset secret code in server side file_DB
          index
        when "/hint"
          hint
        else
          Rack::Response.new('Not Found', 404)
        end
      end
    end

    def run
      result = game(params['numbers'], params['current_round']).run
      Rack::Response.new(result.to_json)
    end

    def index
      Rack::Response.new(render("index.html.erb"))
    end

    def hint
      Rack::Response.new(game(params['numbers'], params['current_round']).hint.to_json)
    end

    private

    def params
      @request.params
    end

    def game(numbers, current_round)
      Codebreaker::Game.new(numbers, current_round)
    end
  end
end
