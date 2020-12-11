class Tweet 
  attr_reader :message, :user

  @@all = []

  def initialize(message, user)
      @message = message
      @user = user

      @@all << self
  end

  # get tweet author's username
  def username
      user.username
  end

  # return all tweets
  def self.all
      @@all
  end

  # get associated likes
  def likes
    Like.all.select do |like|
        like.tweet == self
    end
  end

  # count associated likes
  def like_count
    likes.count
  end

  # get users who liked this tweet
  def likers
    likes.map do |like|
        like.user
    end
  end
end