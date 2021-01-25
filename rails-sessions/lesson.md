# Rails Sessions

If we remember, one of the core requirements of a RESTful server is **statelessness**. This means that there is no shared context between requests. Any instance variables created in one controller action are unavailable in every other.

This presents a challenge! How can we persist data across requests? A classic example for this type of behavior is a shopping cart. As a user shops we need a way to remember which items they have selected for purchase.

## Why not the DB?

We could try to create a `User` class and require users to create an account to shop. And store user's selections in a `cart` table in a database.

- requires quite a bit of additional configuration
- results in storing a lot of data in our database that may not be relevant to persist on the server long term
- breaks path helpers as each url would need to include the user_id
- many users may not want to create an account to shop

## Rails and Cookies

Rails give us a few ways to store temporary user data on the client (their browser/computer). Cart information is not critical to persist with 100% accuracy indefinitely so a temporary solution is perfect. Rails typically accomplishes this behavior using cookies.

### Flash

We've already begun storing data on the client with the rails `Flash` hash.

Each menu item has a button that links to the `add_to_cart_path`

```ruby
# nachos/index.erb

<%= button_to "Add To Cart", add_to_cart_path, method: :patch, params: { nacho_id: nacho.id, name: nacho.name } %>
```

Which hits our `CartController#update` method via the `patch '/cart', to: 'cart#update', as: 'add_to_cart'` route.

```ruby
# carts_controller.rb

class CartsController < ApplicationController
  def update
    flash[:notice] = "Successfully added #{params[:name]} to cart"
    redirect_to nachos_path
  end
end
```

In this action we are assigning a value to a `:notice` key on the flash hash. This hash gets sent along with the response, stored in cookies, and overwritten when the next request is made.

```ruby
# application.erb
<header>
  <%= flash[:notice] %>
</header>
```

Rails `Flash` is temporary. It only persists for one response cycle.

### Sessions

Sessions also use cookies but they persist longer.

Let's implement sessions!

We need to add a new item to the session when a user selects a menu item.

```ruby
# carts_controller.rb

def update
  # session[:cart] ||= []
  session[:cart] << params[:nacho_id]
  
  flash[:notice] = "Successfully added #{params[:name]} to cart"
  redirect_to nachos_path
end
```

Next, in our NachosController we want to make a list of cart items available to the index page.

```ruby
# nachos_controller.rb

def index
  # session[:cart] ||= []
  @cart_items = Nacho.find(session[:cart])
  @nachos = Nacho.all
end
```

and in the view lets display the cart...

```ruby
# application.erb

<% if @cart_items %>
  <h3>Cart</h3>
  <% @cart_items.each do |item| %>
    <li> <%= item.name %> </li>
  <% end %>
<% end %>
```

Amazing! But lets imagine we have pages for other menu items and we want the cart to display for each.

> As we add pages what pieces of code will we end up repeating? How can we DRY this up?

#### Sessions in the Application Controller

We can move our sessions logic into the Application controller by creating helper methods.

> Why are methods in `ApplicationController` accessible in our Nacho and Cart controllers?

```ruby
def add_nacho_to_cart(nacho_id)
  session[:cart] ||= []
  session[:cart] << nacho_id
end

def get_items_from_cart
  session[:cart] ||= []
  @cart_items = Nacho.find(session[:cart])
end
```

We can dry it one step further with a `#cart` method.

```ruby
# application_controller.rb

def cart
  session[:cart] ||= []
end
```

This pattern: `session[:cart] ||= []` is an example of lazy loading. We're telling our program to check for `session[:cart]` in memory. If it doesn't find it, `session[:cart]` returns nil, we then initialize the key with an empty array.
