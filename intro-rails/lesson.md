# Intro to Rails

## Scaffold a Rails App

[Sinatra Video](https://www.youtube.com/watch?v=9ML8PrP3A8E)

```bash
gem install rails
rails new <app-name>
rails generate scaffold <model-name(s)> <column-name>:<data-type> <column-name>:<data-type> ...
rails db:migrate
rails server
```

Bam! In only 4 commands we have a fully functioning rails app!

## What is Rails

Ruby on Rails is:

- a ruby application framework
- that follows MVC and REST architecture
- open-source
- opinionated (convention over configuration)
- prioritizes programmer happiness

Rails was developed in 2003 by David Heinemeier Hansen (DHH) and it is now on version 6 after almost 20 years of community development.

### [Built with Rails](https://skillcrush.com/blog/37-rails-sites/)

## Build a Rails app (more carefully)

### `rails new`

Lets initialize a new rails app with the `new` command.

```bash
rails new petstore --database=postgresql
```

Now that we're building rails apps, it's time to graduate to a fully featured database, PostgreSQL. PostgreSQL is open-source and an industry standard relational database.

#### An aside on open-source software

Why use open-source software?

- community philosophy
- security
- reliability

Open source software is not only free to use, like "freeware", but it is also fully transparent to users and encourage community maintenance and improvement. This means that anyone who wants to create new features has pathways to improve the software that they love!

This open and collaborative ideology is how we as developers have access to so many useful tools. It allows us to build bigger and faster because we can leverage the work of thousands of developers before us FOR FREE.

There is a direct relationship between the needs of developers and the development of tools. By contrast proprietary software is biased by sales and marketing. Companies need to predict the features that users want, and even worse, may prioritize sales (optics) or secondary sources of income (advertising or bloatware).

There are also direct benefits to the security and reliability of the software which often feels contrary to expectation. If the source code is public, isn't there more risk for attack?

In reality, the communities behind beloved open-source projects are fast at both spotting vulnerabilities and fixing them. Because the code is public, many pairs of eyes are able to review the code and push fixes when vulnerabilities are discovered. Contrast proprietary software where the code is hidden, for-profit companies are often motivated to hide vulnerabilities to protect their reputation and often unable or unwilling to prioritize security over sales and marketing. This results in more exposed vulnerabilities and slower patches.

### Directory Tour

Lets review the contents of our newly created Rails app.

```bash
├── app
    ├── assets
    ├── channels
    ├── controllers
    ├── helpers
    ├── javascript
    ├── jobs
    ├── mailers
    ├── models
    ├── views
├── bin
├── config
├── db
├── lib
├── log
├── public
├── test
├── tmp
└── vendor
```

Most of the code we write will live in app. We have some familiar directories: models, views, and controllers.

`/config` holds files related to DB and third party services. Credentials, settings, and configuration.

`/db` contains our database migrations

### Rails Routing

Rails approaches routing a little differently than Sinatra.

Sinatra combines the definition of its routes with the controller actions or resources that correspond to them:

```ruby
# sinatra controller
get "/pets" do
    # Here is the code that will be executed when the client requests /books
end
```

Rails separates these ideas with a `routes.rb` file and dedicated controllers.

> Why does rails enforce this separation?

As program complexity increases, organization becomes more challenging. This Rails convention further promotes separation of concerns!

Rails uses a "routing engine" that works some magic matching RESTful routes with conventionally named controller actions. We can write much less code when we follow Rails conventions :)

```ruby
Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end

```

## Generating Models

```bash
rails g model pet name
```

The `model` generator creates:
- a model file: `pet.rb`
- a migration

```bash
rails g model <model-name(s)> <column-name>:<data-type> <column-name>:<data-type>
```

## Generating Controllers

You'll notice in `app/controller` we have `application_controller.rb` already. This will serve as "parent" to all of our custom controllers. It inherits from `ActionController::Base` which provides all the necessary and helpful controller methods to integrate our controllers with the rest of the application.

There are a few ways to create controllers:

- manually add new files and write ruby
- use the `controller` generator: 
  - `rails g controller pets index show`
    - creates `pets_controller.rb` with `index` and `show` methods
    - creates corresponding views:
      - `views/pets/index.erb`
      - `views/pets/show.erb`
    - adds route handlers for `index` and `show` in `routes.rb`
      - `get 'pets/index'`
      - `get 'pets/show'`
- use the `scaffold_generator`:
  - creates controller methods, views, and routes for all REST actions.
  - note `resources :pets` in `routes.rb` this one line creates routes for all 7 of our resources

### Generating Migrations

We can generate custom migrations too!
Rails is smart and makes assumptions based on the migration name!

```bash
rails g migration add_age_to_pets age:integer
```

generates:

```ruby
class AddAgeToPet < ActiveRecord::Migration[5.1]
  def change
    add_column :pets, :age, :integer
  end
end
```

### Creating Custom Views

There isn't a generator for creating views so if we want to build custom pages we create new files ourselves.

Lets add a pets "about" page `about.html.erb` in the `/views/pets` directory.

If it is a "static" page, meaning it doesn't depend on instance variables from a controller method we can simply configure the routes to display the view.

```ruby
# config/routes.rb

get "/pets/about", to: "pets#about"
```

#### Implicit vs Explicit Rendering

When our controller methods and views share a name by convention, Rails knows to look for the appropriate view to render'

```ruby
def index
end
```

However, if we want to explicitly render a view with an unconventional name we need to explicitly render the file.

```ruby
def index
render 'cats'
# This will render cats.html.erb
end
```

 rails webpacker:install