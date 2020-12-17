class Ride
  attr_reader :driver, :passenger, :distance
  
  @@all = []

  def initialize(driver, passenger, distance)
    @driver = driver
    @passenger = passenger
    @distance = distance.to_f

    @@all << self
  end

  def self.all
    @@all
  end

  def self.average_distance
    distances = all.map do |ride_instance|
      ride_instance.distance
    end

    total_distance = distances.sum
    num_rides = distances.length

    total_distance / num_rides
  end
end
