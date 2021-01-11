class App
  def call(environment_hash)
    req = Rack::Request.new(environment_hash)

    status = 200
    header = {}

    # if req.path.match("/about")
    #   body = ['this is the about page!']
    # elsif req.path.match("/contact")
    #   body = ['this is the contact page!']
    elsif req.path.match("/")
        body = ['this is the home page!']
    else
      status = 404
      body = ['not found!']
    end

    return [status, header, body]
  end
end