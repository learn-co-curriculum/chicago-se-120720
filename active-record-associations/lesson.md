# Active Record Associations

## Domain Modeling

Let's continue with yesterday's example domain: Books and Authors. This lesson will progressively add complexity to the domain via associations.

To start we have two models, `Book` and `Author`, which are not yet associated.

Book

- title
- description

Author

- name

## Creating a Database

Before we start coding let's confirm that we can successfully create an empty database.

```bash
rake db:create
```

The `db:create` rake task will look for our `environment.rb` file for where to store and how to configure our database.

If everything goes correctly you will see a new `db/` directory with a `.db` file inside (that's your database!).

## AR Migrations: Creating New Tables

Our database is still empty. We can create a table for each model by using ActiveRecord migrations.

```bash
rake db:create_migration create_books
rake db:create_migration create_authors
```

The `db:create_migration` rake task creates a new file with an empty migration class which inherits from `ActiveRecord::Migration`.

```ruby
# 20201106162632_create_books.rb

# note the class name mirrors the command line argument create_books
class CreateBooks < ActiveRecord::Migration[6.0]
  def change

  end
end
```

Our first two migrations will use the ActiveRecord `create_table` method:

- takes a symbol of the table name as an argument
  - **table names are always plural and snake_case**
- defines the column names and data types for each model attribute

```ruby
# 20201106162632_create_books.rb

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

```ruby
# 20201106162639_create_authors.rb

class CreateAuthors < ActiveRecord::Migration[6.0]
  def change
    create_table :authors do |t|
      t.string :name

      t.timestamps
    end
  end
end
```

> At this point has the structure of our database changed? How can we check?

Let's look for the `schema.rb` file. It always reflects the true structure of our database. If there's no schema, there's no tables in our database yet.

To run our migrations against the database:

```bash
rake db:migrate
```

You should now see a `schema.rb` file in the `db/` directory.

## AR Models

Next we need models to represent  books and authors in our application code.

Remember: models are singular, CamelCase, and start with a capital letter.

```ruby
# book.rb

class Book < ActiveRecord::Base

end
```

```ruby
# author.rb

class Author < ActiveRecord::Base

end
```

That's all to get our models working. We can test in the console: `rake console`.

```ruby
pry(main)> new_book = Book.new(title: "Pet Cemetary", description: "...")
pry(main)> new_author = Author.new(name: "Stephen King")
pry(main)> new_book.save
pry(main)> new_author.save
```

## AR One-to-Many Relationships

Let's update our domain to reflect a one-to-many relationship between authors and books.

- a book `belongs_to` an author
- an author `has_many` books

We need to update the database via a new migration and update the two models to reflect their new relationship.

### AR Migration: Add a Foreign Key

To persist this new relationship we must update the `books` table with a new column `author_id` (a foreign key)) so that we have a record of the author of each book.

Foreign keys are named after the table the reference. Integers in the `author_id` column will reference the a primary id on the `authors` table.

To update our database we will need a new empty migration.

```bash
rake db:create_migration add_author_id_to_books
``` 

And complete it with the ActiveRecord `add_column` method.

```ruby
# 20201106181107_add_author_id_to_books.rb

class AddAuthorIdToBooks < ActiveRecord::Migration[6.0]
  def change
    add_column :books, :author_id, :integer
  end
end
```

### AR Models `has_many` and `belongs_to`

ActiveRecord gives us two helpful "macros", `has_many` and `belongs_to`. Macros are methods that define other methods (`attr_reader` and `attr_writer` are macros too!)

```ruby
# author.rb

class Author < ActiveRecord::Base
  has_many :books
end
```

```ruby
# book.rb

class Book < ActiveRecord::Base
  belongs_to :author
end
```

`has_many` and `belongs_to` create collection methods we can use in the class and on instances.

Due to the macros:

- `Book#author` will return the associated author
- `Author#books` will return a collection of associated books

## AR Many-to-Many Relationships

Let's further expand our model to represent a many-to-many relationship. Books can now have multiple authors. We will need to create a new join table `authors_books` to represent this relationship.

- a book has many authors through authors_books
- an author has many books through authors_books

We'll follow the steps above for creating a new migration for `authors_books`.

```ruby
def change
  create_table :author_books do |t|
    t.integer :book_id
    t.integer :author_id

    t.timestamps
  end
end
```

And in the models...

```ruby
class Author < ActiveRecord::Base
  has_many :books, through: :author_books
end

class Book < ActiveRecord::Base
  has_many :authors, through: :author_books
end

```
