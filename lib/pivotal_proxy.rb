# encoding: UTF-8
# see http://stackoverflow.com/questions/11057905/how-do-i-use-rackproxy-within-rails-to-proxy-requests-to-a-specific-path-to-an
require 'rack-proxy'

class PivotalProxy < Rack::Proxy

  def rewrite_env(env)
    env["rack.url_scheme"] = "https"
    # env['HTTP_X_FORWARDED_PORT'] = '80'
    env["HTTP_HOST"] = "www.pivotaltracker.com"
    env.delete("HTTP_ACCEPT_ENCODING")
    # pivotal tracker api token needs to be set in the javascript or here
    # env["HTTP_X_TrackerToken"] = ""
    env
  end

  def rewrite_response(triplet)
    status, headers, body = triplet
    headers.reject! {|k,v| k.downcase == 'status' }
    # We'll flatten the response when we return so it won't be chunked
    # anymore and robust clients will complain about that.
    headers.reject! {|k,v| k.downcase == 'transfer-encoding' && v.downcase == 'chunked' }
    [status, headers, body]
  end
end

class WrappingPivotalProxy < PivotalProxy
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
      super
    else
      env
    end
  end
end