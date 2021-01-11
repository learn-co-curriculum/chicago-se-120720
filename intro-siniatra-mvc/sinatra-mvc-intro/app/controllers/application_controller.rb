class ApplicationController < Sinatra::Base
  set :views, "app/views/books"

  get "/" do
    erb :home
  end

  # books index
  get "/books" do
    @books = Book.all
    
    erb :index
  end

  # books new
  get "/books/new" do
    erb :new
  end

  # books show
  get '/books/:id' do
    @book = Book.find(params[:id])

    erb :show
  end



  # books create
  post "/books" do
    book = Book.create(params)
    
    redirect "/books/#{book.id}"
  end
end