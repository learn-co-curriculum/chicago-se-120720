# Rails REST & Forms

## Setup

We'll start by initializing a new Rails app

`rails new doc_office`

and create models and migrations for `Doctor` and `Patient`

`rails g model Doctor name specialty`
`rails g model Patient name condition`

### Routing `resources` keyword

There's a handy keyword `resources` which creates conventional REST routes.

```ruby
# routes.rb

Rails.application.routes.draw do
  resources :doctors, only: [:index, :show, :new, :create]
end
```

The `only:` option allows us to specify which resources we want to create routes for.

The above is equivalent to:

```ruby
# routes.rb

get '/doctors', to: 'doctors#index'
get '/doctors/:id', to: 'doctors#show'
get '/doctors/new', to: 'doctors#new'
post '/doctors', to: 'doctors#create'
```

### `DoctorsController`

```ruby
# doctors_controller.rb

class DoctorsController < ApplicationController
  def index
    @doctors = Doctor.all
  end

  def show
    @doctor = Doctor.find(params[:id])
  end

  def new
    @doctor = Doctor.new
  end

  def create
  end
end
```

## Rails `form_for`

Next we'll create a view for our new form: `doctors/new`

```ruby
# new.html.erb

<%= form_for @doctor do |f| %>
  <%= f.label :name %>
  <%= f.text_field :name %>

  <%= f.label :specialty %>
  <%= f.text_field :specialty %>

  <%= f.submit %>
<% end %>
```

The `form_for` method generates and html form that allows users to create or update instances of the model taken as an argument `form_for @doctor`

When we pass an instance (`@doctor`) as the argument, the form will automatically post to `Doctor#create`

## `Doctor#create`

We'll start by assigning the params when we call the create method.

And after creation we'll use two rails convenience methods:

- `redirect_to` - routes to a new resource
- `doctor_path(@doctor)` - rails path helper to generate the doctor show path

```ruby
def create
  @doctor = Doctor.create({
    name: params[:doctor][:name],
    specialty: params[:doctor][:speciality]
  })

  redirect_to doctor_path(@doctor)
end
```

> Where will we have to replicate this assignment? What if we had 20 parameters?

### Strong Params and private methods

Strong params give us a single place in each controller to define what parameters we are expecting and will allow. This reduces repetition and also adds a new layer of protection from unwanted parameters.

```ruby
# doctor.rb
class Doctor < ApplicationRecord
  ...
  def create
    @doctor = Doctor.create(doctor_params)
  end

  private

  def doctor_params
    params.require(:doctor).permit(:name, :specialty)
  end
end
```

> What are private methods, why use them for `doctor_params`?

## ActionController `before_action`

Lets imagine we want to build out the rest of our CRUD/REST resources. We need `#edit`, `#update`, `#destroy` methods.

> What repetition are we introducing in our controller?

### Create a private `#find_doctor` helper

```ruby
  def find_doctor
    @doctor = Doctor.find(params[:id]
  end
```

Now we can call this method in each method that needs to find a doctor instance, but we can take it one step further...

### `before_action`

ActionController gives us a handy method `before_action` which we can invoke at the top of the class. This tells rails that before each method to invoke a given helper method.

```ruby
class DoctorsController
  before_action :find_doctor, only: [:show, :edit, :update, :destroy]
  ...
end
```

## Rails Naming Conventions

Database: `doctors`
Model: `doctor.rb` -> `class Doctor < ApplicationRecord`
Controller: `doctors_controller.rb` -> `class DoctorsController < ApplicationController`
Views: `doctors/*`

