# Rails Forms and Validations

## Objectives

- discuss different levels of validation
- implement Rails model validations
- update controllers and views to use validations

## Questions

- custom getters and setters vs validation

## Notes

Types of validations:

- client-side: html input validations
  - js
  - html input attribute
  - these are not secure, easy to bypass
- model - Rails validations we define in our models
  - good UX and security 
  - happen on the server
- database 
  - ActiveRecord::Migration configurations
  - SQL commands when creating a new database

do trigger validations:

- create
- create!
- save
- save!
- update
- update!

does not trigger validations:

- decrement!
- decrement_counter
- increment!
- increment_counter
- toggle!
- touch
- update_all
- update_attribute
- update_column
- update_columns
- update_counters

## Icebox