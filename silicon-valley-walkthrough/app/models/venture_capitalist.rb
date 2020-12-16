class VentureCapitalist

  attr_reader :name, :total_worth

  @@all = []

  def initialize(name, total_worth)
    @name = name
    @total_worth = total_worth

    @@all << self
  end

  #should return all of the VC instances
  def self.all
    @@all
  end

  #returns an array of all venture capitalists in the Trés Commas club (they have more then 1,000,000,000 total_worth)
  def self.tres_commas_club
    self.all.select { |vc_instance| vc_instance.total_worth > 1000000000 }
  end

end
