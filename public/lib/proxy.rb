# encoding: UTF-8
# see http://stackoverflow.com/questions/11057905/how-do-i-use-rackproxy-within-rails-to-proxy-requests-to-a-specific-path-to-an
require 'rack-proxy'

class Proxy < Rack::Proxy
  def initialize(app)
    @app = app
  end

  def call(env)
    original_host = env["HTTP_HOST"]
    rewrite_env(env)
    if env["HTTP_HOST"] != original_host
      @status, @headers, @body = perform_request(env)
    else
      # just regular
      @app.call(env)
    end
  end

  def rewrite_env(env)
    request = Rack::Request.new(env)
    if request.path =~ %r{^/services}
      env["rack.url_scheme"] = "https"
      # env['HTTP_X_FORWARDED_PORT'] = '80'
      env["HTTP_HOST"] = "www.pivotaltracker.com"
      # pivotal tracker api token needs to be set in the javascript or here
      # env["HTTP_X_TrackerToken"] = ""
    end
    env
  end
end