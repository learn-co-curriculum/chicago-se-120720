class BooksController < ApplicationController
  # Index
  get '/books' do
    @books = Book.all

    erb :'books/index'
  end

  # new
  get '/books/new' do
    erb :"books/new"
  end

  # Show
  get '/books/:id' do
    @book = Book.find(params[:id])
    
    erb :'books/show'
  end

  # create
  post '/books' do
    book = Book.create(params)

    redirect "/books/#{book.id}"
  end
 
  # edit
  get '/books/:id/edit' do
    @book = Book.find(params[:id])

    erb :"books/edit"
  end

  # update
  patch '/books/:id' do |id|
    book = Book.find(id)
    params.delete("_method")

    book.update(params)

    redirect "/books/#{book.id}"
  end

  # delete
  delete "/books/:id" do |id|
    Book.find(id).delete
   
    redirect "books"
  end
end
