require "pry"

require_relative "tweet.rb"
require_relative "user.rb"

max = User.new("max100")
daniel = User.new("danielisgreat")
abbie = User.new("abbieforthewin")

max_tweet1 = max.post_tweet("max's message")
daniel_tweet1 = daniel.post_tweet("daniels great tweet")
abbit_tweet1 = abbie.post_tweet("abbies got things to say!")

binding.pry