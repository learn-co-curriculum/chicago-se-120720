class ApplicationController < Sinatra::Base
  set :views, "app/views/books"
  set :method_override, true

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

  # books edit
  get "/books/:id/edit" do
    @book = Book.find(params[:id])

    erb :edit
  end

  # update
  put "/books/:id" do
    params.delete("_method")
    book = Book.find(params[:id])
    book.update(params)

    redirect "/books/#{book.id}"
  end

  delete "/books/:id" do
    book = Book.find(params[:id])
    book.delete

    redirect "/books"
  end

end