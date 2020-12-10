# OO Relationships: One to Many Relationships

## Objectives

- implement one to many relationships
- practice passing objects as arguments
- define "single source of truth"

## Questions

- model - a class who's responsibility is to store data
- domain - subject off the application
- domain modeling - representing the domain through custom classes (models)
- relationships - how different models connect and relate to one another

## Notes

Create a User class:

- `User#initialize` which takes a username
- `User#username` reader method
- `User#tweets` that returns an array of Tweet instances
- `User#post_tweet` that takes a message, creates a new tweet, and adds it to the user's tweet collection

Create a Tweet class:

- `Tweet#initialize` which takes a message
- `Tweet#message` that returns a string
- `Tweet#user` that returns an instance of the user class
- `Tweet.all` that returns all the Tweets created.
- `Tweet#username` that returns the username of the tweet's user

## Icebox

## Resources