# Sinatra Forms and Active Record

Demo current app:

- two migrations for `books` and `authors`
- `google_books.rb` adapter now seeds `books` and `authors`
- two models `Book` and `Author`
- run `db:create`
- run `db:migrate`
- run `db:seed`
- `rake console` to show Models work
- **`layout.erb`**

## Multiple Controllers

Utilizing a unique controller for each app model is a common practice in MVC applications

- separation of concerns
- we can re-use common filenames for views

### ApplicationController

ApplicationController now serves as an intermediate class between Sinatra::Base and our model controllers.

- configure views
- welcome page route

```ruby
class ApplicationController < Sinatra::Base

  configure do
    # set :public_folder, 'public'
    set :views, 'app/views'
    set :method_override, true
  end

  get '/' do
    erb :welcome
  end
end
```

## Utilizing Associations in Views

### Books Index

For each book in our index, let's add a link to the author.

```ruby
<a href="/authors/<%= book.author_id"><%= book.author.name %></a> %>
<br>
```

### Books Show

And we'll do the same in the show page.

```ruby
<a href="/authors/<%= @book.author.id %>"><%= @book.author.name %></a>
```

### Authors Show

We can also list all of the books for a give author in their show page.

```ruby
<% @author.books.each do |book| %>
    <h3><%= book.title %></h3>
    <p><%= book.snippet %></p>
<% end %>
```

## Nested Forms

Now that our models are associated, creating new records and updating existing ones becomes a little bit more complex. We now need to include data about which author a book belongs to.

### Books New

The simplest approach would be to add a field for `author_id` to our new and edit forms. 

```ruby
<label for="author_id">author_id</label>
<input type="text" name="author_id" value=""></input>
```

But this doesn't create a great user experience and may set them up for failure.

> What happens if the user enters and id for an author that doesn't exist?

Instead let's make use of a dropdown selection that will allow users to select from only the available authors.

In the books controller lets make all of the authors available to our view.

```ruby
# books_controller.rb
  get '/books/new' do
    @authors = Author.all

    erb :"books/new"
  end
```

In the view we use the `<select>` element which takes a number of `<option>` elements as children.

```ruby
# books/new.erb

<select name="author_id">
    <% @authors.each do |author| %>
        <option value="<%= author.id %>"><%= author.name %></option>
    <% end %>
</select>
```

### Books Edit

Books edit will work similarly to new, however we will apply some conditions in our view to display which option is the current author.

The `<option>` element has an option attribute `selected`. We can interpolate a conditional statement in our .erb file to add this attribute only to the currently associated author.

```ruby
<select name="author_id">
    <% @authors.each do |author| %>
        <% if @book.author_id == author.id %>
            <option value="<%= author.id %>" selected="selected">
        <% else %>
            <option value="<%= author.id %>">
        <% end %>
            <%= author.name %>
        </option>
    <% end %>
</select>
```

## Things to touch on with extra time

- validation: new => save flow
- bang methods: update vs update!
