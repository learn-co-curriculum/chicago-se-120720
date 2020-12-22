# One to Many Relationship in SQL

Our database tables may use one or two types of ids, a **primary key** and **foreign key**

- **primary key** - the unique identifier for a row in a database table
- **foreign key** - a reference pointing to a row on another table

When we associate models, we must reflect their association in our database columns. The foreign key on one table corresponds to a primary key on another table.

```
cats
id | name | age
1    kitty   3
2    catso   11
3    meowth  5

owners 
id   |   name 
1        frank
2        julie
3        randy
```

> Which table is the foreign key placed on?

In a one to many relationship, the foreign key is always included in the table that "belongs to" another. In this example cats belong to a user so on the `cats` table we include a column `owner_id`.

This is convenient because cat's will only ever have one owner. Therefor we only need to save one key per cat.

> How might we find all cats that belong to a certain owner

` SELECT * FROM cats WHERE owner_id = 1`

## Many to Many Relationship in SQL

Domain shift! We're now building a pet app for a commune. Pet ownership is sometimes shared. While some owners have many cats, some cats have many owners.

> In this scenario which class is the parent?

Neither, our domain now requires a many to many relationship!

> What is the solution to the many to many problem of "single source of truth" when we are modeling domains with classes?

A join class!

Just as we create a table for each model, we also create a join table to reflect a join class. A join table generally has 3 columns:

- a `primary_key` which is a unique identifier for each row
- two `foreign_key`s to reference rows on the two tables being joined

The primary key in a join table is almost never looked up directly. We usually access join tables through either of the two foreign keys

```
cats
id | name | age
1    kitty   3
2    catso   11
3    meowth  5

cats_owners
id | cat_id | owner_id
1       1        1
2       1        2
3       2        2
4       3        3

owners | name 
1        frank
2        julie
3        randy
```

> Who are kitty, catso, and meowth's owners?

> How might we right a SQL statement to find all of julie's cats?

`SELECT * FROM cats INNER JOIN cats_owners ON cats.id = cats_owners.cat_id WHERE cats_owners.owner_id = 2` 

## CRUD in SQL

> What are our 4 CRUD actions

- create
`INSERT INTO cats (name, age) VALUES ('Maru', 4);`
- read
`SELECT id, name, age FROM cats;`
- update
`UPDATE cats SET name = "mimi" WHERE id = 3;`
- destroy
`DELETE FROM cats WHERE id = 2;`

## The Tweet app

Today we are building our own ORM (Object Relational Mapper). ORMs connect scripting languages to databases!

We will build out the Tweet app to *abstract* all of our CRUD database actions into an easy to use interface (our `Tweet` class).

We can't write ruby to speak with a database directly but we can wrap SQL statements in Ruby methods which make it easier to repeatedly read and write to the database.

### Aside on Heredocs

In the following methods we will be using Ruby heredocs. Heredocs allow us to write multiline strings which are nice for long SQL statements.

- heredocs start with `<<-<name>`, i.e. `<<-HTML` or `<<-SQL`
- heredocs close with the same name, `HTML` or `SQL` respectively

### ORM Methods

#### Creating a table

```ruby
  def self.create_table
    sql =  <<-SQL 
      CREATE TABLE IF NOT EXISTS tweets (
        id INTEGER PRIMARY KEY,
        username TEXT,
        message TEXT
      )
    SQL
    
    DB[:conn].execute(sql)
end
```

#### Saving a row

```ruby
 def save
    sql = <<-SQL
      INSERT INTO tweets (username, message)
      VALUES (?, ?)
    SQL

    DB[:conn].execute(sql, self.username, self.message)
end
```

#### retrieving data

```ruby
def self.all
    # @@all

    sql = <<-SQL
      SELECT * FROM tweets
    SQL

    DB[:conn].execute(sql)
end
```

#### tweets_app.rb

```ruby
def render(tweets)
    tweets.each.with_index(1) do |tweet, i|
      puts "#{i}. #{tweet["username"]} says: #{tweet["message"]}"
    end
end
```