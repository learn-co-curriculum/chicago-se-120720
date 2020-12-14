require_relative '../config/environment'
require "pry"

fifi = Cat.new("fifi", 12)
bubbles = Fish.new("bubbles", 4, true)
ralphie = Dog.new("ralphie")

binding.pry
