require 'bundler/setup'
Bundler.require
require_rel '../app'

def reload
  load 'config/environment.rb'
end
# Insert code here to run before hitting the binding.pry
# This is a convenient place to define variables and/or set up new object instances,
# so they will be available to test and play around with in your console



st_one = Startup.new("Nick's Deals", "Nick", "Fashion")
st_two = Startup.new("Max's Deals", "Max", "Food")
st_three = Startup.new("Groupon", "Chicago People", "Food")

vc_one = VentureCapitalist.new("Marty", 92000)
vc_two = VentureCapitalist.new("Rachelle", 10000002)
vc_three = VentureCapitalist.new("Daniel", 3000000000000000)

fr_one = FundingRound.new(st_one, vc_one, "Series A", 100)
fr_two = FundingRound.new(st_one, vc_three, "Series A", 5)
fr_three = FundingRound.new(st_one, vc_one, "Series B", 1000)
fr_four = FundingRound.new(st_three, vc_one, "Series C", 14000)

binding.pry
0 #leave this here to ensure binding.pry isn't the last line
