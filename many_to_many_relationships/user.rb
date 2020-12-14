class User
  attr_reader :username
  attr_accessor :string

  def initialize(username)
    @username = username
    @string = "thing"
  end

  # post a new tweet
  def post_tweet(message)
    Tweet.new(message, self)
  end

  # get associated tweets
  def tweets
    Tweet.all.select do |tweet|
        tweet.user == self
    end
  end

  # like a tweet
  def like_tweet(tweet)
    Like.new(self, tweet)
  end

  # get associated likes
  def likes
    Like.all.select do |like|
        like.user == self
    end
  end

  # get liked tweets
  def liked_tweets
    likes.map do |like|
      like.tweet
    end
  end

  # get the messages of all liked tweets
  def liked_messages
    liked_tweets.map do |liked_tweet|
      liked_tweet.message
    end
  end

  def change_string
    self.string ="another thing"
    # binding.pry
  end
end