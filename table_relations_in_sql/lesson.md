# What is SQL?

SQL stands for Structured Query Language.
SQL allows us to:

- store and persist information
- manipulate that information

SQLite 3 is a relational database. In a relational database, data (information) is stored in rows on tables. You can imagine Excel spreadsheets.

CRUD is an acronym describing the types of actions we can take on a relational database:

- Create data
- Read data
- Update data
- Delete data

## Where can we write SQL?

- console -> sqlite3
- SQL Browser
- application code

### sqlite3 CLI

In the console we can connect to our demo database `chinook.db`:

```bash
$ sqlite3 chinook.db
# SQLite version 3.28.0 2019-04-15 14:49:49
```

A database stores data in tables which represent each model. If we use the `.tables` command we can list the tables in the database we're currently connected to.

```bash
sqlite> .tables
# albums   artists    genres   tracks
```

### Conventions

- table names should correspond to model names
    -  `Pet` model -> `pets` table
    - Model is upcase singlular
    - table is lowercase plural
- foreign keys are named `<foreign_table_name_singular>_id

## Ids

- primary_key - unique identifiers for each row in a table]
- foreign key - pointer or a reference to a row on a different table

## JOINS

- INNER JOIN - show only rows that have a relationship
- LEFT JOIN - show all rows on the left adding columns of the right table when there is a relationship

## Practice SQL Crud

1. Write the SQL to return all of the rows in the artists tables

`SELECT * FROM artists`

2. Write the SQL to select the artist with the name "Black Sabbath"

`SELECT * FROM artists WHERE name = 'Black Sabbath'`

3. Write the SQL to create a table named 'fans' with an autoincrementing ID that's a primary key and a name field of type text

`CREATE TABLE fans (id INTEGER PRIMARY KEY, name TEXT)`

4. Write the SQL to alter the fans table to have an artist_id column of type integer

> What relationship does the column `artist_id` suggest?

`ALTER TABLE fans ADD COLUMN artist_id INTEGER`

5. Write the SQL to add yourself as a fan of Black Sabbath(artist_id = 12)

first we'll find the artist id for Black Sabbath.
`SELECT * FROM artists WHERE name = 'Black Sabbath'`

Then we use that ID for the new record in the fans column.
`INSERT INTO fans (name, artist_id) VALUES ("Your name", 169)`

6. Return fans that are not fans of Black Sabbath(artist_id = 12)

`SELECT * FROM fans WHERE artist_id IS NOT 12`

7. Return artists name next to their album title

`SELECT * FROM fans INNER JOIN artists ON fans.artist_id = artists.id;`
