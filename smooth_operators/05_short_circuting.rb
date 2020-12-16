require 'pry'

class TimeBomb

  attr_accessor :name, :ticker_count

  def initialize(bomb_hash)
    bomb_hash[:ticker_count] ||= 10
    @name = bomb_hash[:name]
    @ticker_count = bomb_hash[:ticker_count]
  end

  def tick
    self.ticker_count > 0 ? tick_clock : "This bomb has already exploded!"
  end

  def tick_clock
    self.ticker_count -= 1
    self.ticker_count == 0 && `say kaboom`
    self.ticker_count
  end

end

bomb_one = TimeBomb.new({name: "Acme 1000", ticker_count: 3})
bomb_two = TimeBomb.new({name: "The Big Baby"})

binding.pry
0
