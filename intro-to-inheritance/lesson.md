# Intro to Inheritance

In this demo we start with a few classes representing dogs, cats, and fish.

`Cat`

- can initialize a cat
- initializes with a name
- can't change its name
- initializes with a nervous mood
- can change its mood

`Dog`

- can initialize a dog
- initializes with a name
- can't change its name
- initializes with a nervous mood
- can change its mood

`Fish`

- can initialize a fish
- initializes with a name
- can't change its name
- initializes with a nervous mood
- can change its mood

Lets run rspec to confirm passing tests.
> What patterns do we see in the test cases

In programming we want to avoid repeating ourselves. When we notice a pattern of similar code being repeated in 3 or more places, it's time to refactor.

Repetition is a sign that there is an underlying **abstraction**.

- **abstraction** - the process of removing details or attributes to focus on details of greater importance
- **abstraction** - the creation of abstract objects that mirror common features or attributes of non-abstract objects

Two repetitions is fine, it's better to have just one duplicate than make assumptions and create the wrong abstraction.

> So, what does the word **inheritance** mean to you? IRL?

In programming inheritance is a mechanism of message forwarding. When we call a method on an instance, ruby first checks to see if a method of that name is defined on it's class, if there is none ruby works up the chain of ancestors stopping to look for a matching method along the way.

Remember, all values in ruby are objects

```ruby
"hello".methods # {..., ..., ...}
```

> Where do these methods come from?

```ruby
"hello".class # String
String.ancestors 
# [String, Comparable, Object, PP::ObjectMixin, Kernel, BasicObject]
```

## Refactor using Inheritance

The goal of this refactor is to find all the elements shared across `Dog`, `Cat`, and `Fish` and abstract them into a new `Pet` class.

## `pet.rb`

```ruby
class Pet
  attr_reader :name
  attr_accessor :mood

  def initialize(name)
    @name = name
    @mood = 'nervous'
  end
end
```

## `dog.rb`

before we begin lets get a sense of `Dog`'s current inheritance hierarchy.

```ruby
Dog.superclass # Object
Dog.ancestors
# [Dog, Object, PP::ObjectMixin, Kernel, BasicObject]
```

To inherit in ruby we use a single `<` character followed by the superclass

```ruby
class Dog < Pet

  # attr_reader :name
  # attr_accessor :mood

  def initialize(name)
    # @name = name
    # @mood = 'nervous'
  end
end
```

Now we can confirm we've changed the hierarchy. `Dog`'s first ancestor, its superclass, is now `Pet`

```ruby
Dog.superclass # Pet
Dog.ancestors
# [Dog, Pet, Object, PP::ObjectMixin, Kernel, BasicObject]

fido = Dog.new('fido') # #<Dog:0x00007fd69d8ea488>
fido.name # nil
```

The last step is to ensure our `initialize` method forwards up the chain by using the `super` method. `super` calls the initialize method of the superclass with the same arguments received.


```ruby
class Dog < Pet
  def initialize(name)
    super
  end
end
```

```ruby
Dog.superclass # Pet
Dog.ancestors
# [Dog, Pet, Object, PP::ObjectMixin, Kernel, BasicObject]

fido = Dog.new('fido') 
# #<Dog:0x00007f82148f0dc0 @mood="nervous", @name="fido">
fido.name # "fido"
```

## `cat.rb`

> What if one of our subclasses needs custom behavior?

We can still write custom attributes, accessors, and methods on each individual subclass!

```ruby
class Cat < Pet
  attr_reader :num_lives

  def initialize(name)
    super
    @num_lives = 9
  end
end
```

> What happens if both the superclass and subclass share a method name

```ruby
class Pet

  attr_reader :name
  attr_accessor :mood

  def initialize(name)
    @name = name
    @mood = "nervous"
  end

  def speak 
    puts "hello"
  end
end
```