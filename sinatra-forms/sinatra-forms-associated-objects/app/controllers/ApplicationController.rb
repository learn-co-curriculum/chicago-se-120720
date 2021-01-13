class ApplicationController < Sinatra::Base
  set :views, 'app/views'
  set :layout, "/books_layout"

  get '/' do
    redirect '/books'
  end
end