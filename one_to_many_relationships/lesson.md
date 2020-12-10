# Introduction

## Domain Modeling

### Vocabulary

- Model - a class whose primary responsibility is to store data
- Domain - the subject matter of the application scope
  - Canvas's domain is online education
- Domain Modeling - representing the domain through custom Classes
- Relationships - how models in the domain are connected to each other

### Domain Model drawing exercise (model Flatiron School)

## One to Many Demo

### Demo Deliverables

- Create a `User` class:
  - `User#initialize` which takes a username
  - `User#username` reader method
  - `User#tweets` that returns an array of Tweet instances
  - `User#post_tweet` that takes a message, creates a new tweet, and adds it to the user's tweet collection
- Create a `Tweet` class:
  - `Tweet#message` that returns a string
  - `Tweet#user` that returns an instance of the user class
  - `Tweet.all` that returns all the Tweets created.
  - `Tweet#username` that returns the username of the tweet's user

> What relationship do we expect our two classes to have?

### `tweet.rb`

- Create a `Tweet` class:
  - `Tweet#message` that returns a string
  - `Tweet#user` that returns an instance of the user class
  - `Tweet.all` that returns all the Tweets created.
  - `Tweet#username` that returns the username of the tweet's user

```ruby
# tweet.rb

class Tweet
    attr_reader :message, :user

    @@all = []

    def initialize(message, user)
        @message = message
        @user = user

        @@all << self
    end

    def username
        @user.username
    end

    def self.all
        @@all
    end
end
```

> Lets run `$ ruby run.rb` with a pry and create a `Tweet`. What do we expect `my_tweet.message to return? .user? .username?

### `user.rb`

- Create a `User` class:
  - `User#initialize` which takes a username
  - `User#username` reader method
  - `User#tweets` that returns an array of Tweet instances
  - `User#post_tweet` that takes a message, creates a new tweet, and adds it to the user's tweet collection

```ruby
class User
    attr_reader :username, :tweets

    def initialize(username)
        @username = username

        # 🚫 this is not best practice and used for demonstration only 🚫
        @tweets = []
    end

    def post_tweet(message)
        new_tweet = Tweet.new(message, self)

        # 🚫 this is not best practice and used for demonstration only 🚫
        @tweets << new_tweet
    end
end
```

> So now our `User` instances create instances of `Tweet` whenever a user posts! What do we expect `Tweet.all.first.username` to return?

### `run.rb`

We will use the `run.rb` file as our **single point of entry**. We will use files `tweet.rb` and `user.rb` to keep our code organized. By splitting our code across multiple files we create **separation of concerns** and **single responsibility**. Each file is named to represent the utility of the code it contains.

> What problems do we avoid by designing our directory in this way?

```ruby
# run.rb

require_relative "tweet.rb"
require_relative "user.rb"

puts Tweet.new
puts User.new
```


### Single Responsibility

Amazing our two Classes are related to each other. A user may have many tweets!

*but theres a catch...*

> What happens if we delete a tweet `Tweet.all.pop`? Is our user aware?

```ruby
# create user with a few tweets
user = User.new("Don")
user.post_tweet("my first tweet")
user.post_tweet("my second tweet")

Tweet.all
# [tweet1, tweet2]
Tweet.all.pop
Tweet.all
# [tweet1]

user.tweets
# [tweet1, tweet2]
```

Oh no! Our data is out of sync! Our domain model doesn't guarantee a single source of truth! We saved `Tweet` instances on a `User` instance variable

> We need to choose! Which model should be singly responsible for the relationship? 

It's more efficient to have `Tweet` instances hold a reference to their one "parent" `User` instance than for a `User` instance to hold an array of many tweets

### Revise `user.rb`

```ruby
class User
    attr_reader :username

    def initialize(username)
        @username = username
        # @tweets = []
    end

    def post_tweet(message)
        # new_tweet = Tweet.new(message, self)
        Tweet.new(message, self)
        # @tweets << new_tweet
    end

    def tweets
        # @tweets

        Tweet.all.select do |tweet|
            tweet.user == self
        end
    end
end
```

> Now what do we expect `user.tweets` to return after we delete a Tweet instance?