# Many to Many Relationships

## Review of Object Orientation

```ruby
# previously we've been accustom to seeing object attributes like this:
user = User.new("username")
user.tweets # ["tweet1" "tweet2 that's longer", "tweet3"]

# now that we're in OO world, we will more often see related objects as such:
user.tweets 
# [<Tweet @message="tweet1" <Tweet @message="tweet2 that's longer", <Tweet @message="tweet3"]
```

When we relate objects in Ruby, we often pass instances of other classes as arguments. This may feel strange, but actually we've been doing it all along!

Remember, every value in Ruby is an object!

```ruby
  # something like this
  Tweet.new('this is my message')

  # is equivalent to 
  message_string = String.new('this is my message')
  Tweet.new(message_string)

  # we've just been leveraging some helpful Ruby syntax for simplicity.
```

### Aquarium Example

Lets imagine we want to model the domain of an aquarium:

- an aquarium has many exhibits
- an exhibit has many fish

> What models will we need to create? What relationships do they have? How might we instantiate them in code?

```ruby
my_aquarium = Aquarium.new("my big aquarium")
exhibit_1 = Exhibit.new('exhibit 1 name', my_aquarium)
nemo = Fish.new('nemo', exhibit_1)
```

In one-to-many relationships we use the language:

- "has many" - an exhibit **has many** fish
- "belongs to" - an fish **belongs to** an exhibit

The class that "belongs to" another is responsible for managing the relationship

- instances of `Fish` will maintain an `@exhibit` attribute
- instances of `Exhibit` will maintain an `@aquarium` attribute

This is much more efficient than having instances of `Exhibit` maintain an ever growing array of fish and solves our single responsibility problem!

## Intro to Many to Many Relationships

> Consider the domain between doctors and patients, what type of relationship do they have?

When we approach this domain with only two models we run into a problem. We can't codify the "has may" relationship in both directions between the models without creating an array of objects, i.e. 

```ruby
doctor.patients 
# [<Patient>, <Patient>, <Patient>] 

# if patients also have many doctors we find ourselves in hell
patient.doctors
# [<Doctor @patients=[
#   <Patient @doctors=[
#       <Doctor @patients=[
#            ...
#       ]>
#    ]>
#]>]
```

We don't want to break single responsibility or create a recursive nightmare! This is a good sign we need to create a new model! We'll call it `Appointment`!

`Appointment` instances:
- **belongs to** a doctor
- **belongs to** a patient

We've created a new model to take responsibility for relating patients to doctors!

> Diagram the many-to-many relationship

Now we can say:

- A doctor has many appointments
- A patient has many appointments
- A doctor has many patients **through** appointments
- A patient has many doctors **through** appointments

We've solved the many to many problem by creating two one-to-many relationships with a "join" model `Appointment`. 

```ruby
    class Appointment
        attr_reader :doctor, :patient

        def initialize (doctor, patient)
            @doctor = doctor
            @patient = patient
        end
    end
```

## Many-to-Many Twitter

Where we've left off, we have a model where Users have many tweets and tweets belong to users. But there's another way users can connect with tweets that's not included in our current model. A many-to-many relationship.

Likes!

- users have many likes
- tweets have many likes
- users have many tweets **through** likes
- tweets have many users **through** likes

### `like.rb`

Lets start by creating a `Like` model that has attributes for the user and tweet that it belongs to.

```ruby
class Like
  attr_accessor :user, :tweet

  @@all = []

  def initialize(user, tweet)
    @user = user
    @tweet = tweet
    @@all << self
  end

  def self.all
    @@all
  end
end
```

### "Liking" a tweet

The user model will be responsible for the action of "liking" a tweet, which reflects the domain. Users of twitter hit the like buttons!

```ruby
class User
    attr_reader :username

    def initialize(username)
        @username = username
    end

    ...

    def like_tweet(tweet)
        Like.new(self, tweet)
    end
end
```

## retrieving likes from user

> What if we want to find all of the likes by a specific user?

Because this information is relative to a single user, lets build a `#likes` method in the `User` model.

```ruby
class User
    attr_reader :username

    def initialize(username)
        @username = username
    end

    ...

    def like_tweet(tweet)
        Like.new(self, tweet)
    end

    def likes
        Like.all.select do |like|
            like.user == self
        end
    end
end
```

## Student Exercise

Now that we have a likes method... how could we get a list of all of a user's liked tweets?