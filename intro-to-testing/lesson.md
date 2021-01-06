# Intro to Testing

## The `Hero` class

We have some starter code with a Hero class. It initializes with an array of ability hashes.

- `#coolest_ability` returns the hero's coolest ability
- `#ordered_abilities` *should* return an array of ability names in order

## `#ordered_abilities`

Lets build our ordered abilities method.

```ruby
def ordered_abilities 
    abilities = @abilities.map do | ability |
        ability[:name]
    end
    abilities.sort
end
```

> How might we refactor to promote the single responsibility principal?

```ruby
def abilities
    @abilities.map do | ability |
        ability[:name]
    end
end

def ordered_abilities 
    abilities.sort
end
```

## Oh no! `#coolest_ability` is broken`

> What happened?

As our applications grow and become more complex it becomes more and more likely new changes will break existing features. And without manually testing every feature with each new change we run the risk of "deploying" broken code. 

You can imagine eventually the cost of manual testing would become untenable and slow development considerably.

## Introducing RSpec!

Lets install RSpec

- add `gem "rspec"` to the `Gemfile`
- `bundle install`
- `rspec --init`

Note the new folder `spec/` and file `spec_helper.rb`

### Testing the `Hero` model

- Create a new file `hero_spec.rb` in the `spec/` directory
    - generally the convention is to name spec files `<tested_file_name>_spec.rb`
- Require the code we want to test `require_relative '../config/environment.rb'`

### `#describe`

We should start each test file with a `describe` block.

- describe takes an argument of a string or class. In this case we are testing the `Hero` class so it's most appropriate.
- all of our tests will go inside this block
- at the top of our describe block we will initialize the subject we want to test using `#subject`, in this case a instance of `Hero`

```ruby
describe Hero do
   subject(:hero) {
        Hero.new([
            {
                name: "Super Strength",
                coolness: 3
            },
            {
                name:"Flight",
                coolness: 5
            },
            {
                name: "Lighting Blast",
                coolness: 10
            }
        ])
   }
end
```

We can also use additional describe blocks inside to differentiate between methods that we are testing

```ruby
describe Hero do
    subject(:hero) {
        Hero.new([...])
    }

    describe "#coolest_ability" do

    end
end
```

### #it

We assert our "expectations" by using `it` blocks. They take a string as an argument to describe the expectation they test inside

- we initialize any helpful variables using `#let`

```ruby
describe Hero do
    subject(:hero) {
        Hero.new([...])
    }

    describe "#coolest_ability" do
        let(:coolest_ability) {
            {
                name: "lightning blast",
                coolness: 10
            }
        }

        it "should return hero's coolest ability" do
            expect(subject.coolest_ability).to eq(coolest_ability)
        end
    end
end
```

### test `#ordered_abilities`

- add a new describe block for `#ordered_abilities`
- define an expected_list of strings
- write the expectation

```ruby
    describe "#ordered_abilities" do
        let(:alphabetical_abilities) { ["flight", "lightning blast", "super strength"] }

        it "should return a list of ability names in alphabetical order" do
            expect(subject.ordered_abilities).to eq(alphabetical_abilities)
        end
    end
```

### test `#abilities`

- use include matcher
    - order doesn't matter

```ruby
describe "#abilities" do
    it "should return a list of ability names" do
        expect(hero.abilities).to include("Flight", "Lighting Blast", "Super Strength")
    end
end
```

### Fixing the broken tests

- rename `#abilities` to `#ability_names` in `Hero`
- rename `#abilities` to `#ability_names` in `hero_spec.rb`

## Test Driven Development (TDD): `#add_ability`

TDD is about writing specs to describe your intention before writing a new method or feature. This forces you to think through your own expectations and break apart the problem.

- leads to better tested code
- leads to code that has good separation of concerns
- prevents half-baked ideas

**The motto is: "red, green, refactor"**

1. Write your test, run the suite, expect **failure** ("red")
2. Implement a passing solution ("green")
3. Rewrite your solution to optimize or make more readable ("refactor")

### The "Happy" Path

What are our expectations when things go well? The happy path describes a scenario in which our user uses the application in the way it was intended.

```ruby
describe "#add_ability" do
    let(:new_ability) {
        {
            name: "Hammer Call",
            coolness: 9
        }
    }

    it 'should add the ability to the subjects abilities' do
        hero.add_ability(new_ability)

        expect(hero.abilities).to include(new_ability) 
    end
end
```

```ruby
def add_ability(ability)
    abilities << ability
end
```

### The "Sad" Path

The sad path describes a scenario in which the user engages with our application in ways we don't intend. It's good to test all scenarios so we ensure our users aren't hit with unexpected errors.

> What happens if we were to give a sting as an argument to `#add_ability`?

- we'll use the `#context` method to differentiate the two possible paths

```ruby
describe "#add_ability" do
    context "if new ability is a hash" do
        ...
    end

    context "if new ability is not a hash" do
        let(:string_ability) { "Hammer Call" }

        it "should not add an ability if it is not a hash" do
            subject.add_ability(string_ability)
            expect(subject.abilities).to_not include(string_ability)
        end
    end
end
```

```ruby
def add_ability(ability)
    if ability.class == Hash
        abilities << ability
    end
end
```

## Conclusion

- working code vs good code, good code:
    - can be extended
    - understood by other developers
- TDD encourages us to write testable code
    - follows separation of concerns and single responsibility principles