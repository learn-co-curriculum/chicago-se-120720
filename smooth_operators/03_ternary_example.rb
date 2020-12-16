require 'pry'

class PizzaOrder
  attr_reader :vegetarian

  def initialize(order_hash)
    @vegetarian = order_hash[:vegetarian]
  end

  def order_up
    return_statement =  self.vegetarian ?  veggie() : meat()
    return_statement
  end

  def veggie
    "What a peaceful pie..."
  end

  def meat
     "Here's your meat lovers ya filthy animal!"
  end


end

order_one = PizzaOrder.new(vegetarian: true)
order_two = PizzaOrder.new(vegetarian: false)

binding.pry
0
