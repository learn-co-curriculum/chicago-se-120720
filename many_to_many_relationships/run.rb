require "pry"

require_relative "tweet.rb"
require_relative "user.rb"
require_relative "like.rb"

louise = User.new("Louise")
ramona = User.new("Ramona")
micah = User.new("Micah")

louise_first_tweet = louise.post_tweet("louise's first tweet")
louise_second_tweet = louise.post_tweet("louise's second tweet")
louise_third_tweet = louise.post_tweet("louise's third tweet")

ramona_first_tweet = ramona.post_tweet("ramona's first tweet")
ramona_second_tweet = ramona.post_tweet("ramona's second tweet")
ramona_third_tweet = ramona.post_tweet("ramona's third tweet")

micah_first_tweet = micah.post_tweet("micah's first tweet")
micah_second_tweet = micah.post_tweet("micah's second tweet")
micah_third_tweet = micah.post_tweet("micah's third tweet")

liked_tweet1 = louise.like_tweet(micah_second_tweet)
liked_tweet2 = louise.like_tweet(micah_third_tweet)
liked_tweet3 = louise.like_tweet(micah_first_tweet)
liked_tweet4 = ramona.like_tweet(micah_first_tweet)
liked_tweet5 = micah.like_tweet(louise_first_tweet)

binding.pry