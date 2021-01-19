# Rails Associations and Forms

## Setup

```bash
rails new flavortown
cd flavortown
rails g resource User name
rails g resource Post title content user_id:integer
rails db:migrate
```

## One to Many Relationship

```ruby
class User < ApplicationRecord
  has_many :posts, dependent: :destroy
  # provide methods like User#posts
end

class Post < ApplicationRecord
  belongs_to :user
end
```

### `dependent: :destroy`

> What happens if we destroy one of our users? Does this impact the associated posts?

The dependent destroy option instructs ActiveRecord to delete any associated `Post` records in the case that a `User` is deleted.

Without this option, we may end up with "orphaned" `Post` records in our database (posts without users). This is not inherently bad or wrong. In some domains you may want to maintain posts even if a user deletes there account.

Instagram is certainly keeping your photos even if you quit using their service...

```ruby
  has_many :posts, dependent: :destroy
```

## Post Index and Show

Lets create some basic views and Read actions for our User model.

### PostsController

```ruby
class PostsController < ApplicationController

  def index
    @posts = Post.all 
  end

  def show
    @post = Post.find(params[:id])
  end
end
```

### Posts Views

Rails routes give us access to some routing "path" helpers. These are methods that return paths to different resources. We have access to them in both our views and controllers.

A few examples for our Post resources:

- posts_path: "/posts" -> PostsController#index
- post_path(<post_instance>) "/posts/:id" -> PostsController#show

These are useful in combination with the `link_to` method in views or the `redirect_to` method in controllers!

```ruby
# posts/index

<h1>Posts</h1>
<ul>
  <% @posts.each do |post| %>
    <li><%= link_to post.title, post_path(post) %></li>
  <% end %>
</ul>
```

```ruby
# posts/show

<h1><%= @post.title %></h1>
<h4>by: <%=@post.user.name %></h4>
<p><%= @post.content %></p>
<%= link_to "index", posts_path %>
```

## Post New/Create w/ Association

Next we want to build a form that allows a user to create a new post. However, it is important that we associate the post with the correct user.

### PostsController#new

> What data do we need to have available in our new post form?

```ruby
# posts_controller.rb

def new
  @post = Post.new
  @users = User.all
end
```

### New Post View

Previously we may have created a dropdown form like so:

```ruby
<select name="post[user_id]">
  <% User.all.each do |user| %>
    <option value="<%= user.id %>">
      <%= user.name %>
    </option>
  <% end %>
</select>
```

Rails makes this simpler with the `collection_select` method. This method takes a few arguments:

1. the parameter key, the name of the attribute to be assigned to
2. the collection to create a dropdown from
3. the value that will be sent with the parameter key
4. the text to display in the dropdown list

```ruby
# posts/new.erb
<%= form_for(@post) do |f| %>
    <%= f.label :title %>
    <%= f.text_field :title %>

    <%= f.label :content %>
    <%= f.text_area :content %>

    <%= f.label :user %>

  <%= f.collection_select(:user_id, @users, :id, :name) %>
  <%= f.submit %>
<% end %>
```

### PostsController#create

```ruby
  def create
    post = Post.create(post_params)

    redirect_to post_path(post)
  end

  private

  def post_params
    params.require(:post).permit(:title, :content, :user_id)
  end
```
