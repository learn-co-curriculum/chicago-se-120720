require 'pry'

class Dog
  attr_accessor :name

  def initialize(dog_hash)
    @name = dog_hash[:name]
  end

  def adopt
    if !self.name
      self.name = "Spot"
    end
    "Your new dog's name is #{self.name}"
  end

end

dog_one = Dog.new({})
dog_two = Dog.new({name: "Lassie"})

binding.pry
0
