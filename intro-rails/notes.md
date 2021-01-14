# Intro to Rails

## Objectives

- create a new Rails Application
- compare Sinatra routing to Rails routing
- generate a model
- generate a controller
- create actions for a RESTful controller
- create views
- create routes

## Questions

- `resources` in the routes.rb file
  - method to define routes for a given model

## Notes

What is Rails?

- a ruby application framework
- follows MVC and REST architecture
- open-source
- very opinionated (convention over configuration)

Rails conventions
- table name: lowercase, snake_case, plural
- model class: Upercase, camelCase, singular
- model files: lowercase, snake_case, singular
- migrations: lowercase, snake_case
- controller class: Uppercase, camelCase, plural, append "Controller"

Rails Generators

generate
`rails g <generator_method> <any arguments or options>` to generate new files

destroy
`rails d <generator_method> <any arguments or options>` to delete generated files

- scaffold - creates a model, migration, views, controller, routes, other extra junk we don't need
- model - creates a model and migration
  - `rails g model <model_name> <column_name>:<data_type> <column_name>:<data_type> ...`
- controller - creates a controller, views, and routes
  - `rails g controller <model_name> <CRUD action> <CRUD action> ...`
- migration - create a new migration
  - `rails g migration <migration_name>`
- resource - creates model, migration, controller, and resources
  - `rails g resource <model_name> <column_name>:<data_type> ...`

## Icebox
