# Intro to Sinatra and MCV

## MCV Architecture

MVC is one of many common programming paradigms. It's important to note that it"s not necessarily better or worse than others, only that it is useful for building web apps and APIs.

MVC applications are typically organized into three main parts:

- Models
- Views
- Controllers

Models are our interface with the DB.

- We use our models to read or modify data
- Methods that touch a database table should live on the respective model.

Views are the external interface of our application.

- Browsers display views for users to interact with
- Users submit requests to the server through links or form submissions

Controllers connect our user, models, and views through routes.

- Controllers parse incoming requests
- retrieve or change relevant data
- and return the appropriate view to the user

**As our applications grow in size and complexity, the MVC pattern helps us maintain separation of concerns.**

- scalability - clear pathway for developing new features
- maintainability - other developers know where to start looking when bugs arise
- DRY - views enable us to dynamically create pages
- community/support - common patterns help people communicate

## CRUD, URLs, and REST

### CRUD

We're familiar with the common CRUD actions: create, read, update, and destroy.

### REST

REST is another architectural pattern that works in harmony with MVC. Similarly it provides conventions that encourages web applications to behave consistently.

**RE**presentation **S**tate **T**ransfer. What does it mean for an application to be RESTful? REST has 6 guiding principles but we will only talk about 2 today.

1. Client-server - rest applications separate user interface concerns from data storage concerns
2. Stateless - each request from client to server contains all necessary information to understand the request

REST uses HTTP verbs and discrete "resources" to enforce these principles.

- resources are actions or information we want to make available to users
- resources can be accessed by the combination of a route and HTTP verb

![REST](CRUDREST.png)

**REST is a huge benefit to developers because it promotes consistency making it easier to anticipate and use external apps and resources.**

## Setup a Sinatra App

Why Sinatra?

- `rack` alone can be messy. It"s very flexible but requires a lot of manual set up and configuration
- `sinatra` constrains how we interface with our server, we abstract away some customization in favor of convention to save time and promote consistency

### Create a `home` route

```ruby
# application_controller.rb

get "/" do
    erb :home
end
```

oops, sinatra doesn"t know where to find out views

```ruby
    set :views, "app/views"

    get "/" do
        erb :home
    end
```

### Create a `/books` route (Index)

we first need a new route/resource

```ruby
# application_controller
    get "/books" do
        @books = Book.all

        erb :index
    end
```

then a view! We will need our ERB tags

```ruby
# index.erb
<% @books.each do |book| %>
    <p>
        <a href="/books/<%= book.id %>"><%= book.title %></a>
    <p>
<% end %>
```

### Now we need a `/books/:id` show page

add a new resource!

```ruby
# application_controller

get "/books/:id" do
    @book = Book.find(params[:id])

    erb :show
end
```

and a new view!

```ruby
<p>Author: <%= @book.author %></p>
<p>Title: <%= @book.title %></p>
<p>Snippet: <%= @book.snippet %></p>
```

### What if we want to create a new book?

```ruby
# application_controller

get "/books/new" do

    erb :new
end
```

and the view (now with a form!)

```ruby
# new.erb

<form action="/books" method="post">
    <label for="title">title</label>
    <input type="text" name="title" value"">

    <label for="author">author</label>
    <input type="text" name="author" value"">

    <label for="snippet">snippet</label>
    <input type="text" name="snippet" value"">

    <input type="submit" value="Create Book"
</form>
```

and now we need a create resource to catch the forms submit request

```ruby
# application_controller

post "/books" do
    book = Book.create(params)

    redirect "/books/#{book.id}"
end
```

> why use the method redirect instead of simply rendering the show view?

By using the `redirect` method we update the url in the browser to reflect the current page. Using the `erb` method will update the view but the url will not correlate.

### edit a book?

We'll start by adding a link on the show page to edit a book.

> What route should we link to?

```ruby
#show.erb

<a href="/books/<%= @book.id %>/edit">edit</a>
```

```ruby
# application_controller

get "books/:id/edit" do
    @book = Book.find(params[:id])

    erb :edit
end
```

and view, looks a lot like new but we can pre-populate the values so the user can see what the current data looks like

```ruby
# edit.erb

<form action="/books/<%= @book.id %>" method="put">
    <label for="title">title</label>
    <input type="text" name="title" value="<%= @book.title %>">

    <label for="author">author</label>
    <input type="text" name="author" value="<%= @book.author%>">

    <label for="snippet">snippet</label>
    <input type="text" name="snippet" value="<%= @book.snippet %>">

    <input type="submit" value="Edit Book">
</form>
```

and a put resource

```ruby
  put "/books/:id" do
        book = Book.find(params[:id])

        book.update(params)


        redirect "/books/#{book.id}"
    end
```

uh oh, we don"t seem to be hitting our put resource! Actually http only allows get and post requests... what will we do?

we need to add a hidden input to tell sinatra we actually want to update

- we use input type `hidden` because this element is not intended for the user, it's intended only for our server
- sinatra expects an attribute with the key `_method` for overriding HTTP actions
- the value `put` tells sinatra the action we want to override with

```ruby
# edit.erb

<form>
    <input type="hidden" name="_method" value="put">
...
</form>
```

and we need to configure our controller to expect this hack by enabling `method_override` in our `application_controller`

```ruby
# application_controller

set :method_override, true

# update
put "/books/:id" do

# we need to delete the hidden param to avoid an "UnknownAttribute" error
params.delete("_method")

book = Book.find(params[:id])
book.update(params)

redirect "/books/#{book.id}"
end
```

### Delete a book

And finally, to delete a book we can add a button to the show page by creating a small form

```ruby
# show.erb
...
<form action="/books/<%= @book.id %>" method="post">
  <input type="hidden" name="_method" value="delete">
  <input type="submit" value="delete book">
</form>
```

And the controller action.

```ruby
delete  "/books/:id" do
    book = Book.find(params[:id])
    book.delete

    redirect "/books"
end
```
