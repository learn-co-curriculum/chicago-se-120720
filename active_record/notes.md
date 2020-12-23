# Intro to ActiveRecord

## Objectives

- define Object Relational Mapper (ORM)
- describe Ruby gems and package management 
- describe `rake` and run rake tasks
- implement ActiveRecord

## Questions

## Notes

### ActiveRecord Rake Commands

- db:create - create a new database if it doesn't exist
- db:create_migration - create migration files
- db:migrate - this executes all of our migrations against the database
- db:drop - DELETES THE DATABASE, DANGER!
- db:rollback - UNDOES THE LAST MIGRATION, DANGER!

### ActiveRecord::Base Methods

- `Model.new` - creates a new instance, doesn't save
- `Model.save` - saves an existing instance
- `Model.create` - initializes AND saves a new instance
- `Model.all` - returns a collection of all records
- `Model.first` - returns the first record
- `Model.find` - takes an id and returns that record
- `Model.find_by(title: "The Lorax")` - takes an argument of an attribute and returns the first
- `Model#update()`