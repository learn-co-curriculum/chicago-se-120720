# Table Relations in SQL

## Objectives

- discuss persistance and the need for SQL
- differentiate SQLite3 and SQL
- Perform CRUD actions on a table
- Perform CRUD actions across related tables

## Questions

- why can't we use right and full joins?
  - constraint of sqlite
  - postgreSQL
- heredocs?
- rename column in table
  `ALTER TABLE Test1 RENAME COLUMN foo TO baz;`

## Notes

SQL - Structure Query Language

  - language used to communicate with relational databases
  - CRUD - Create Read Update Destroy
    - Create - write a new record into a db
      - `SELECT`
    - Read - read or access a record or records from a db
    - Update - overwrite or edit a record or records
    - Delete - delete or remove a record or records from a database

sqlite3 - relational database

Relational database

- data is structured in tables
  - columns represent data attributes
  - rows represent records or instances

Models
  - current
    - describe the shape of our data
      - attributes
    - describe methods
    - storing data

  - new
    - describe methods

    - database
      - storing

    - schema
      - structure/shape of database

persistance - data needs to be saved more permanently

### Accessing Databases

- console - sqlite3
- SQL Browser
- application -> sqlite3 gem to integrate SQL into our ruby code


### Conventions

- tables names are always lowercase and plural `artists`
- models are always upcase and singular `Artist`

### SQL examples

1. Write SQL to return all of the artists

`SELECT * FROM artists;`

> Select <comma separated column names> FROM <table name>;

2. Select the artist with the name "Black Sabbath"

`SELECT * FROM artists WHERE name = 'Black Sabbath';`

> SELECT <columns> FROM <table> WHERE <condition>;

3. create a table named fans with an autoincrementing ID that is a primary key and name field of type text

`CREATE TABLE fans (id INTEGER PRIMARY KEY, name TEXT);`

> CREATE TABLE <new table name> (<comma separated column descriptions>);

4. add an artist_id column to the fans table.

`ALTER TABLE fans ADD COLUMN artist_id INTEGER;`

> ALTGER TABLE <table name> ADD COLUMN <new column name> <datatype>;

5. Add a fan to the fans table (fan of black sabbath)

`INSERT INTO fans (name, artist_id) VALUES ("abbie", 12);`

> INSERT INTO <tablename> (<columns>) VALUES (<values for each column>);

6. Return fans that are not fans of Black Sabbath(artist_id = 12)

`SELECT * FROM fans WHERE artist_id IS NOT 12;`

7. Return fans next to their artists

`SELECT * FROM artists INNER JOIN fans ON fans.artist_id = artists.id;`

### JOIN TABLES

combination of two tables in a relational database

- INNER JOIN
- LEFT JOIN


## sqlite3 tricks

- .mode columns
- .headers on


## Ids

- primary key - unique key for each record on a table
- foreign key - integer referencing the primary key on a different table

## Icebox

## Resources
