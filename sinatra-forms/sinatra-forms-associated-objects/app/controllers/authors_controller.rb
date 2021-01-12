class AuthorsController < ApplicationController
    # index
    get "/authors" do
        @authors = Author.all

        erb :"authors/index"
    end

    # new 
    get "/authors/new" do
    
        erb :"authors/new"
    end

    # show
    get "/authors/:id" do |id|
        @author = Author.includes(:books).find(id)

        erb :"authors/show"
    end

    # create
    post "/authors" do
        author = Author.create(params)

        redirect "/authors/#{author.id}"
    end

    # edit
    get "/authors/:id/edit" do
        @author = Author.find(params[:id])

        erb :"authors/edit"
    end
    
    # update
    patch "/authors/:id" do |id|
        author = Author.find(id)
        params.delete("_method")
        
        author.update(params)

        redirect "/authors#{author.id}"
    end

    # delete
    delete "/authors/:id" do |id|
        Author.find(id).delete
       
       redirect "authors"
    end
end
