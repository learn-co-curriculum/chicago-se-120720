# Authentication in Rails

## Authentication vs Authorization

Authentication - Who are you? Prove it
Authorization - What are you allowed to do as a <user type>?

Authentication is concerned with verifying that a user is who they say they are. The most common way to do this is through a username and password combination. In theory, only the user should know their password, thus confirming their identity.

Authorization comes after authentication. After a user has verified who they are, what access or permissions do they have. Think of the different abilities an admin may have over a regular user. Authorization is concerned with limiting access across different types of users.

## Passwords: Hashing

It is VERY important that we protect our users passwords. Users commonly use the same password in multiple spaces (not great, but reality). So exposing a user's password is really dangerous. As developers we ALWAYS need to obscure passwords, storing passwords as plain text is B A D.

If a website or service ever sends you an email with your password in it, that's a huge red flag that they are handling sensitive data inappropriately.

We protect passwords via hashing! Hashing obscures text into a long string of random looking characters. This way the user's actual password is never saved directly to the database. If the db is compromised the user's password is still obscured.

### Encryption vs Hashing

There's another common way to scramble and obscure data, encryption. Encryption is similar to hashing and important in different contexts. 

The primary difference is that encryption is reversible but hashing is not. 

Encryption scrambles data and only those with a private key have the ability to decode and read your message. This is how HTTPS ensures your traffic is not visible to third parties in between.

Hashes cannot be decoded so they are even harder to hack (there's no key to unlock). You can never guess a password given a hash. Hashes are not reversible but they *are* repeatable. When user's sign in, we take the password they enter, run it through the same hashing algorithm and compare the hashes. If the two hashed passwords are the same, then the original strings were the same. Bam, authenticated.

## Authenticating Users in Rails

To begin we'll create a `User` model with `username` and `password_digest` attributes.

```bash
rails g resource User username password_digest
rails db:migrate
```

### User Sign Up

#### New User Form

```ruby
# users/new.erb

<%= form_for @user do |f| %>
  <%= f.label :username %>
  <%= f.text_field :username %>
  <%= f.label :password %>
  <%= f.password_field :password %>
  <%= f.label :password_confirmation %>
  <%= f.password_field :password_confirmation %>
  <%= f.submit %>
<% end %>
```

#### UsersController

```ruby
# users_controller.rb

def new
  @user = User.new
end

def create
  @user = User.new(user_params)

  if @user.save
    redirect_to @user
  else
    redirect_to new_user_path
  end
end

private

def user_params
  params.require(:user).permit(:username, :password, :password_confirmation)
end
```

#### Bcrypt

You may notice that our `users` columns differ from our form attributes. That's because we've yet to introduce Bcrypt, the intermediary between the form and database that will handle passwords securely. Bcrypt will confirm that the `password` and `password_confirmation` fields are duplicates and then hash the user's password before saving it to the database.

We just need to include the gem...

```ruby
# gemfile

...
gem 'bcrypt'
```

... and update our model. We will validate that usernames are unique too!

```ruby
class User < ApplicationRecord
  has_secure_password

  validates :username, uniqueness: { case_sensitive: false }
end
```

### User Sign In

We need a way for user's to authenticate, to confirm that they are who they say they are. We'll create a "Sign In" flow.

#### Routes

Let's update our routes to be a bit more semantic.

```ruby
# routes.rb
resources :users, only: [:create, :show]

get "signup", to: "users#new"
get "login", to: "sessions#new"
post "sessions", to: "sessions#create"
```

#### New Session Form

Our form uses a `form_tag` so we don't need to create a new instance `@session` to build the form.

```ruby
# sessions/new.erb

<%= form_tag sessions_path do %>
  <%= label_tag "Username" %>
  <%= text_field_tag :username %>
  <%= label_tag "Password" %>
  <%= password_field_tag :password %>
  <%= submit_tag "Sign In" %>
<% end %>
```

#### SessionsController

```ruby
def create
  user = User.find_by(username: params[:username])

# if user.authenticate(params[:password]) <- will break if user is not found
  if @user.try(:authenticate, params[:password])
    redirect_to user
  else
    redirect_to login_path
  end
end
```

### Authorization?

Amazing, at this point our user can confirm they have the correct password but this doesn't actually provide them with any new permissions and nothing is persisted between requests. Our app is currently pretty insecure.

#### Sessions

To persist whether a user is currently signed in we need sessions! Sessions allow the user's client to remember that they're logged in. Every time they visit a new page, the session will carry their `user_id` and we can confirm they're authorized to continue. If the session doesn't contain a `user_id` we redirect to have the user sign in.

Whenever a new user is created or an existing user signs in we want to store their `id` in a session.

```ruby
session[:user_id] = @user.id
```

We'll add this in both the "sign up" and "log in" flows.

#### Authorized requests

Next we want to confirm that a user is signed in when they make a request to any of our routes (except the login route of course!)

Lets create some helpers in `ApplicationController`.

```ruby
#ApplicationController

class ApplicationController < ActionController::Base
  before_action :authorize

  def current_user
    @user = User.find_by(id: session[:user_id])
  end

  def authorize
    redirect_to login_path unless current_user
  end
end
```

There are a few controller actions we do not want to authorize before, those related to sign up and log in.

In those controllers we can specify not to run the before action

```ruby
# users_controller.rb

class UsersController < ApplicationController  
  skip_before_action :authorized, only: [:new, :create]

  ...

end
```

```ruby
# sessions_controller.rb

class SessionsController < ApplicationController  
  skip_before_action :authorized

  ...

end
```

### Log out

We can log out by deleting the session!

```ruby
# sessions_controller

def destroy
  session.delete(:user_id)
end
```

and a route so we can hit this resource

```ruby
# routes.rb

Rails.application.routes.draw do
  resources :users, only: [:create, :show]

  get "signup", to: "users#new"
  get "login", to: "sessions#new"
  post "sessions", to:"sessions#create"
  delete "sessions", to: "sessions#destroy"
end
```

Finally, we'll update `application.erb` with a log out button to display on every view

```ruby
  <% if current_user %>
    <%= link_to "Logout", sessions_path, method: :delete %>
  <% else %>
    <%= link_to "Login", login_path %>
  <% end %>
```
