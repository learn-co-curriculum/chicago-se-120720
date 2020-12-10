class User
  attr_accessor :username

  def initialize (username)
    @username = username

    # don't do this! single responsibility
    # @tweets = []
  end

  def post_tweet(message)
    new_tweet = Tweet.new(message, self)

    # don't do this! single responsibility
    # @tweets << new_tweet
  end

  def tweets
    Tweet.all.select do |tweet|
      tweet.user == self
    end
  end
end