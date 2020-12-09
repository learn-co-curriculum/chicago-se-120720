# Objects in Ruby

## What is an Object?

> No seriously, what is an object?

Objects are a fundamental building block of Object Oriented Programming. They describe the discrete things that interact within our programs.

Objects may contain:

- **attributes**: data describing the object
- **methods**: actions that the object can perform

## Asside on IRB

## Creating Objects

In Ruby we can create objects in several ways, the simplest is to instantiate the `Object` class.

```ruby
new_object = Object.new
new_object.object_id # 70140691637580
```

> Why are all objects created with an ID?

Another common common way is to use Ruby `Hash` syntax. Hashes are great for holding attributes that we can access easily by looking up a key.

- **A `Hash` is a dictionary-like collection of keys and their values**

```ruby
bank_account = { user_name: "Jane Doe", balance: 100 }
bank_account[:user_name] # 3
bank_account[:balance] # 100
```

> But this is a `Hash`... are hashes the same as objects?

## Everything is an Object in Ruby

```ruby
# lets check the data type of bank_account
bank_account.class # Hash
```

### Hashes have attributes and methods

Hashes are a data type in Ruby

```ruby
# lets check the keys
bank_account.keys # [:user_name, :balance]
# and the values
bank_account.values # ["Jane Doe", 100]
```

> If hashes in Ruby can hold data in the form of key/value pairs, and hashes also come with methods to access that data...

```ruby
# lets confirm that the Object methods we used above work on our bank_account hash
bank_account.object_id # 70140713490200
bank_account.hello # "hi"
```

### All Objects are not Hashes

In ruby a `Hash` has access to all of the default attributes and methods that an `Object` does. However, the inverse is not true.

```ruby
new_object.keys # NoMethodError (undefined method `keys' ...)
```

### Datatypes

A `Hash` is a type of `Object` (a.k.a a **data type**) in Ruby. All hashes are objects but all objects are not hashes! Ruby includes several **data types** and we can create our own custom `Object` types as needed.

- `Object` is the default root of all Ruby objects
- In Ruby, a data type is a predefined type of `Object` with built-in attributes and methods

> What other **data types** have we used in Ruby?

```ruby
bank_account[:user_name].class # String
bank_account[:balance].class # Integer
```

> What methods are available for use on `String` or `Integer` instances?

We can confirm that hashes, stings, and integers are objects using the `superclass` method available to all Ruby classes.

```ruby
Hash.superclass # Object
String.superclass # Object
Integer.superclass # Numeric
Numeric.superclass # Object
```

## Creating Objects through Ruby Classes

In Ruby we may use a **class** to build custom objects.

- A **class** is a code-template for creating objects 
- An object created by a **class** is called an **instance**

`Hash` is a class included in Ruby. When we define a `Hash` using bracket syntax (`{}`) we are creating an **instance** of `Hash`. We could also write...

```ruby
hash = Hash.new()
hash[:user_name] = "Jane"
hash[:balance] = 100

## don't do this, it's not very clear or concise
```

> `String`, `Integer` and `Hash` are ruby classes we commonly instantiate in our code, why might we need to build custom Ruby classes?

Classes can describe a number of features available to either the class **or** instances of the class:

- instance
  - **instance variables**, data specific to a particular object created by this class
  - **instance methods**, functionality available to any object created by this class
- class
  - **class variables**, data related to a class or all of a class's instances
  - **class methods**, methods available to the class

At its simplest, a ruby class implements the `class` keyword followed by the class name and closes  with `end`.

- **Ruby class names ALWAYS start with a capital letter and are camelCase**

```ruby
class BankAccount

end

BankAccount.new # #<BankAccount:0x00007f87f39b4d58>
```

> We didn't define a `new` method, where did this functionality come from?

All classes in Ruby inherit from `Object`!

## Initialize

The `initialize` method is where we describe what attributes our objects will hold by defining **instance variables**. `initialize` is called automatically after `new` is called on a class and a new instance is created. We can also include any behavior we want to perform at the moment each new instance is created. 

- **Instance variables** are always preceded by an `@` symbol.
- **Instance variables** can only be accessed in the class definition.

```ruby
class BankAccount
    def initialize(user_name, balance)
        @user_name = user_name
        @balance = balance

        puts "new bank account created for #{@user_name}"
    end
end

BankAccount.new("Jane", 100) 
# new bank account created for Jane
# <BankAccount:0x00007f8869888c38>
```

> Why might Ruby include special syntax to differentiate **instance variables** from other variables in ruby?

Instance variables have expanded scope compared to regular variables. They can be accessed throughout the class definition.

## Getters and Setters

Currently we have no way to read or write to our instance object's attributes. "Getters" and "Setters" are colloquial names for **instance methods** that read or write attributes respectively.

- **Instance methods** are methods that can only be called on an instance of a class or within a class definition

```ruby
class BankAccount
    def initialize(user_name, balance)
        ...
    end

    def user_name
        @user_name
    end

    def user_name=(new_user_name)
        @user_name = new_user_name
    end
end

janes_account = BankAccount.new("Jane", 100)
puts janes_account.user_name # "Jane"
puts janes_account.user_name = "Julian" # "Julian"
```

## Attribute Readers and Writers

> Now imagine and class with 10 attributes, or 50! What pitfalls might you anticipate using getters and setters as described above?

Fortunately, Ruby classes comes equipped with a few methods that make getting and setting simple!

- `attr_reader` - allows attribute to be read
- `attr_writer` - allows attribute to be written
- `attr_accessor` - allows attribute to be both read and written

```ruby
class BankAccount
    attr_accessor :user_name

    def initialize(user_name, balance)
        ...    
    end

    # def user_name 
    #     @user_name
    # end

    # def user_name=(new_user_name)
    #     @user_name = new_user_name
    # end
end

janes_account = BankAccount.new("Jane", 100)
puts janes_account.user_name # "Jane"
puts janes_account.user_name = "Julian" # "Julian"
```

> Why might we want to use `attr_reader` or `attr_writer` instead of `attr_accessor` when it already does both reading and writing? 

It's good to err on the side of restriction. It's easy to give additional permissions as we need them but it can be hard to identify areas that need greater restriction later.

BankAccount holders should be able to freely read and write their user_name but let's prevent them from changing their balance.

```ruby
class BankAccount
    attr_accessor :user_name
    attr_reader :balance

    def initialize(user_name, balance)
        ...
    end
end
```

## Class Variables and `self`

A class definition may also define **class variables**. Class variables often reflect information that is relative to a group where instance variables are relative to an individual instance.

- **Class variables** are always preceded by two `@@` symbols.
- **Class variables** can only be accessed in the class definition.
- The value of a **class variable** is shared across all instances of a class

```ruby
class BankAccount
    attr_accessor :user_name
    attr_reader :balance

    @@all = []

    def initialize(user_name, balance)
        @user_name = user_name
        @balance = balance

        puts "new bank account created for #{@user_name}"
    end
end
```

> How many times do we assign `@user_name` if we create 10 instances of `BankAccount`?
>
> What about `@@all`?

Within a class definition we always have access to a keyword `self`. `self` points to **either** a class or an instance of a class depending on it's location.

- `self` is relative to its nearest containing object

```ruby
class BankAccount
    attr_accessor :user_name
    attr_reader :balance

    @@all = []

    def initialize(user_name, balance)
        @user_name = user_name
        @balance = balance

        @@all << self
        puts "new bank account created for #{@user_name}"
    end

    def self.all
        @@all
    end
end

janes_account = BankAccount.new("Jane", 100)
marks_account = BankAccount.new("Mark", 100)
toms_account = BankAccount.new("Tom", 100)
stephs_account = BankAccount.new("Steph", 100)

BankAccount.all
 # #<BankAccount:0x00007fc874944258>
 # #<BankAccount:0x00007fc874944208>
 # #<BankAccount:0x00007fc8749441b8>
 # #<BankAccount:0x00007fc874944168>
```

- `initialize` is an **instance method** so self points to a specific instance of `BankAccount`
- In the case of `self.all`, our nearest containing object is the class itself so self points to `BankAccount` directly

`self.all` is an example of a **class method**. Class methods can be called on the class directly, i.e. `BankAccount.all`

> What other class methods have we seen so far?

# map, select, find, and each