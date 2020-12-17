require_relative '../config/environment.rb'

def reload
  load 'config/environment.rb'
end

max = Passenger.new("max")
nick = Passenger.new("nick")
david = Passenger.new("david")

marc = Driver.new("marc")
rachelle = Driver.new("rachelle")
esma = Driver.new("esma")

ride_one = Ride.new(marc, max, 3)
ride_two = Ride.new(rachelle, max, 13)
ride_three = Ride.new(rachelle, nick, 2)
ride_four = Ride.new(rachelle, max, 100)

# Put your variables here~!

binding.pry
