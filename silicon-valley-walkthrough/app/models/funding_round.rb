class FundingRound

  attr_reader :startup, :venture_capitalist, :amount
  attr_accessor :type

  @@all = []

  def initialize(startup, venture_capitalist, type, amount)
    @startup = startup
    @venture_capitalist = venture_capitalist
    @type = type
    @amount = amount

    @@all << self
  end

  def self.all
    @@all
  end

end
