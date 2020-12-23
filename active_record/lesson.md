# Intro to ActiveRecord

## Ruby Gems

As developers we benefit from collaboration. Sharing packages of code is one way developers make their work accessible for other's to use. In Ruby, we call these packages 'gems'.

The `Gemfile` is used to list all of our project's third party dependencies, gems and the `bundler` gem is used to manage and import the gems listed.

In this lesson we will review the features of two commonly used Ruby gems, `rake` and `activerecord`.

## Rake and Rake Tasks

Rake is a task runner. It is a tool that allows us to easily execute scripted processes within our application.

We can write custom tasks in the `Rakefile`.

```ruby
desc "Count to ten"
task :count_to_ten do
  (1..10).to_a.each { |num| puts num }
end
```

You might also notice we have a `:console` task for starting a pry session. This is handy for quickly testing changes to your code.

The beauty of `rake` is that we can import rake tasks from other ruby gems! We will use `rake` to run tasks defined in the `sinatra-activerecord` gem which help us to setup and manage a database.

## ActiveRecord

### ActiveRecord Rake Tasks

ActiveRecord rake tasks are used to create and modify a database. There are a few important tasks to know:

- `db:create`
- `db:create_migration`
- `db:migrate`
- `db:drop`
- `db:rollback`

#### `db:create`

`rake db:create` will create a new database.
<!-- 
> How does activerecord know what to call our database and where to save it?

In `environment.rb` we configure `ActiveRecord` with the `sqlite3` adapter. -->

#### `db:create_migration`

When we work with databases, we need a way to accurately reproduce the needed database structure across different machines. You and your pair may be working on the same project but on different computers. Migration files help us quickly and accurately set up a projects database in a way that is easy to repeat in different environments.

> What does the word environment mean in the context of programming?

When we are coding locally, we call this the "development" environment. When our application goes live on a remote server this is called "production".

We'll create our first migration with the task `rake db:create_migration create_books`.

```ruby
class CreateBooks < ActiveRecord::Migration[6.0]
  def change
  end
end
```

We could create migration files by hand but it's better to use a rake task due to the timestamp in the filename (we'll come back to this when we talk about the schema).

Our first migration currently doesn't make any changes to the database. We'll update it to create the `books` table.

```ruby
class CreateBooks < ActiveRecord::Migration[6.0]
  def change
    create_table :books do |t|
      t.string :title
      t.text :description

      t.timestamps
    end
  end
end
```

> How would we write this in SQL if not for ActiveRecord?

```SQL
CREATE TABLE books (
  title STRING,
  description TEXT,
  created_at STRING,
  updated_at STRING
)
```

#### `db:migrate`

Once we've created a migration we need to run it against the database. `rake db:migrate` will execute any migrations **that have not yet been run**.

**It's important to note this is DESTRUCTIVE and data will be lost.** It is almost NEVER ok to drop the database in a production environment.

#### `db:rollback`

A non-destructive way to undo changes made in migrations is to call `rake db:rollback`. Always use rollback when editing migrations if possible.

### ActiveRecord Models

ActiveRecord provides a number of helpful model methods too! Some may look familiar:

- `Model.new`
- `Model.save`
- `Model.create`
- `Model.all`
- `Model.first`
- `Model.find`
- `Model.find_by(title: "The Lorax")`

ActiveRecord is our new ORM. So we will use the methods it provides to persist data in our database.
**ActiveRecord is replacing many of the custom methods we have been building in our classes.**

By updating our model to inherit from `ActiveRecord::Base` we get access to all of ActiveRecord's methods.

```ruby
class Book < ActiveRecord::Base

end
```

The only difference now in implementation is how we pass arguments. We now must use keyword arguments. ActiveRecord depends on these more descriptive args to allow more flexibility when creating and updating records.

```ruby
book = Book.new(title: "The Shining", description: "haunted hotel and big yikes")
```
