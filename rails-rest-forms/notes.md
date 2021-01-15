# Rails REST & Forms

## Objectives

- build forms `form_for` helper
- strong params
- new -> save flow
  - vs create

## Questions

- `rails g migration` w/ typo?
 - `rails d migration` - undoes last generated migration
 - edit migration file before running migrate
- is rails d migration the same as db:rollback
  - `d migration` undo the generator
  - `db:rollback` undo the last run migration
- review `resources` method in `routes.rb`
  - `only: []` option


## Rails Naming Conventions

- db table names `doctors`
  - plural
  - snake_case
  - lowercase
- model names `Doctor`
  - singular
  - capitalized
  - CamelCase
- model file names `doctor.rb`
  - singular
  - lowercase
  - snake_case
- controllers `doctors_controller.rb`
  - plural
  - snake_case
  - lowercase
  
## Icebox
