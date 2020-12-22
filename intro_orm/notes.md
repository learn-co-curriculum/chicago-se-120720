# Intro to ORMs

## Objective

- Define Object Relational Mapper (ORM)
- Distinguish between ORMs and SQL
- Demonstrate that an ORM connects a scripting language to a database
- Define persistant CRUD actions on a model

## Questions

- why .first?
  `SELECT * FROM artists WHERE name = "some name" LIMIT 1`
  -> [<record1>]
  instance1.name vs instance[:name] - latter is used in ORMs

## One to Many

- primary key - unique identifier for each record in a table
- foreign key - reference to a row on another table 
  - `artist_id` references the `artists` table

cats
id | name | age | owner_id
1    kitty   3       2
2    catso   11      2
3    meowth  5       3

owners
id   |   name
1        frank
2        julie
3        randy

- return cats related to julie
  - which id is julies
  `SELECT id FROM owners WHERE owner.name = "julie";`
  - return all cats where the foreign key is that of julie
  `SELECT * FROM cats WHERE id = 2;`

## SQL CRUD Review

- create a record of cat
`INSERT INTO cats (name, owner_id) VALUES ("maru", 1);`

- read records from the cat table
`SELECT * FROM cats;`

- update a cat record
`UPDATE cats SET name = "mimi" WHERE id = 2;`

- destroy a cat record
`DELETE FROM cats WHERE id = 2;`

- find all of julies cats
`SELECT * FROM cats WHERE id = 2;`

## Conventions

## CRUD review

# ICEBOX