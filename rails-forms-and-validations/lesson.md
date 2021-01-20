# Rails Forms and Validations

## Setup

```bash
rails new valid_bagel
cd valid_bagel
rails g scaffold bagel name price:float tasty:boolean
```

Amazing! Remember the "scaffold" generator does a lot for us, use with caution only after you are comfortable manually creating the necessary app files.

## Validations Overview

Validations help us ensure that the data stored in our database is consistent and accurate! There are three main places we may want to validate incoming data:

- client-side: validate input in the user's browser through html input types and constrains
- model: Rails model validations
- database: configure column constrains in migrations to ensure rows are not null or unique

Independently each layer has weaknesses. In combination, however, these three levels of validation ensure both "clean" data and a good user experience.

**If you *have* to prioritize, go with the Rails model validations. They provide good protection and UX**

### Client Side Input Types and Constraints

Client side validations are useful for providing real-time feedback to users before submitting a form. Though if used alone do not provide enough protection. Consider these a UX "nice to have".

Savvy users can easily bypass these validations using JavaScript so this type of validation **does not** effectively protect your database.

### Rails Model Validations

Rails model validations provide adequate security in preventing users from saving unwanted or poorly formatted data. Rails also provides tools for providing users feedback when they submit invalid fields.

**This is a "must have" in terms of security and user experience.** There is room for improvement on both fronts though this method provides the greatest bang for your buck and SHOULD NOT BE SKIPPED.

### Database Constrains

We've already implemented one type of database constrain: column type constrains. At the database level we can configure columns to only accept a specific data type.

In addition we can add constraints that columns:

- not be null
- have a default value

Database constraints are especially important if the database is changed via multiple interfaces which greatly increases the risk of inconsistent data.

Database constraints are the hardest to bypass but provide the least in terms of user experience. Any constraint on the database should be duplicated in the model so users **never** have to see a client-side database error, yuck.

## Database Constrains in Rails Migrations

Lets open our generated migration. Let's add additional constraints to our `bagels` table:

- none of the columns should be null
- tasty should default to `false`

```ruby
class CreateBagels < ActiveRecord::Migration[6.0]
  def change
    create_table :bagels do |t|
      t.string :name, null: false
      t.float :price, null: false
      t.boolean :tasty, null: false, default: false

      t.timestamps
    end
  end
end
```

ActiveRecord is fairly limited in the types of database constraints it can enforce through migrations. Generally speaking, this is good design to encourage the use of model validations. If additional constraints are needed due to multiple interfaces you will need to configure by executing SQL with the `#execute` method. This is rarely needed or advised.

> What happens when we attempt to submit form data that conflicts with these constrains

Yikes! We get a Rails database error in the browser. Secure? Yes. Pleasant? Not at all :/

## Model Validations

ActiveRecord to the rescue, lets start by duplicating our null constraints in our `Bagel` model.

```ruby
class Bagel < ApplicationRecord
  validates :name, presence: true
  validates :price, presence: true

  # presence: true cannot be used for boolean fields
  # validates :tasty, presence: true
end
```

or in one line

```ruby
class Bagel < ApplicationRecord
  validates :name, :price, presence: true
end
```

Additional validation deliverables:

- Bagel names should not be duplicate
- Price should not be greater than 30

### Uniqueness

```ruby
class Bagel < ApplicationRecord
  validates :name, :price, presence: true
  validates :name, uniqueness: true
  validates :price, numericality: { less_than: 30 }
end
```

### Custom Validations

There are many cases where we need custom logic to determine if an attribute value is valid. ActiveRecord includes a method `#validate` to run custom validation methods.

```ruby
class Bagel < ApplicationRecord
  validates :name, :price, presence: true
  validates :name, uniqueness: true
  validate :validate_num_for_price

  def validate_num_for_price
    if self.price.class != Float || self.price > 30
      self.errors.add(:price, "Needs to be a number less than 30")
    end
  end
end
```

### When does validation happen?

Validations happen when we create, save, or update before a new record is actually added to the database:

- create
- create!
- save
- save!
- update
- update!

> Lets add a byebug inside our custom validation to confirm the scenarios that trigger validations

There are a number of ActiveRecord methods that bypass validations:

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

`bagel.update_columns(price: 300)` will not hit our model validations!

## Implementing Validations in Controllers and Views

Next we need to make use of our validations!

Currently our `BagelsControler#create` method will silently fail if validations don't pass.

```ruby
# bagels_controller.rb
  ...
  def create
    @bagel = Bagel.create(bagel_params)

    redirect_to @bagel
  end
```

We'll implement a condition to determine the correct course of action.

```ruby
# bagels_controller.rb
  ...
  def create
    @bagel = Bagel.new(bagel_params)

    if @bagel.save
      redirect_to @bagel
    else
      render :new
    end
  end
```

We will update our `bagels/new` view to expect errors

```ruby
# views/bagels/new.erb
<%= form_for @bagel do |f| %>

  <% if @bagel.errors.any? %>
    <div id="error_explanation">
      <h2><%= pluralize(@bagel.errors.count, "error") %> prohibited this bagel from being saved:</h2>

      <ul>
        <% @bagel.errors.full_messages.each do |message| %>
          <li><%= message %></li>
        <% end %>
      </ul>
    </div>
  <% end %>

  <div class="field">
    <%= f.label :name %>
    <%= f.text_field :name %>
  </div>

  <div class="field">
    <%= f.label :price %>
    <%= f.text_field :price %>
  </div>

  <div class="field">
    <%= f.label :tasty %>
    <%= f.check_box :tasty %>
  </div>

  <div class="actions">
    <%= f.submit %>
  </div>
<% end %>
```

At the top of the view we will add a ruby if condition to check if our `@bagel` instance has any errors. ActiveRecord validations will automatically add errors to the instance `.errors` array and out custom adds an error manually.

One piece of Rails magic to note, the `#label` and input methods will automatically add a div with the class `.field-with-errors` when an error is detected for that attribute!

Lets add some styles to `application.css`

```css
.field_with_errors {
  padding: 2px;
  background-color: red;
  display: table; 
}

#error_explanation {
  width: 450px;
  border: 2px solid red;
  padding: 7px 7px 0;
  margin-bottom: 20px;
  background-color: #f0f0f0; 
}

#error_explanation h2 {
  text-align: left;
  font-weight: bold;
  padding: 5px 5px 5px 15px;
  font-size: 12px;
  margin: -7px -7px 0;
  background-color: #c00;
  color: #fff;
}
```

## Input types and Constraints

Good use of html input types can prevent a lot of errors before they happen. By constraining the types of inputs in HTML, users will have a harder time submitting invalid forms.

Lets update our price field to restrict the user before hitting our Rails validations

```ruby
<div class="field">
    <%= form.label :price %>
    <%# <%= form.text_field :price %>
    <%= number_field(:bagel, :price, in: 1.0..30.0, step: 0.05) %>
</div>
```

There are many types of HTML fields with corresponding ActionView Form helpers.

[ActionView Form Helpers](https://guides.rubyonrails.org/form_helpers.html#other-helpers-of-interest)