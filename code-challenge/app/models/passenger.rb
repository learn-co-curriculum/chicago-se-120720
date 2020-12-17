class Passenger
  attr_reader :name
  
  @@all = []

  def initialize(name)
    @name = name

    @@all << self
  end

  def rides
    Ride.all.select do |ride_instance|
      ride_instance.passenger == self
    end
  end

  def drivers
    rides.map do |ride_instance|
      ride_instance.driver
    end
  end

  def total_distance
    distances = rides.map do |ride_instance|
      ride_instance.distance
    end
    
    distances.sum
  end

  def self.all
    @@all
  end

  def self.premium_members
    self.all.select do |passenger_instance|
      passenger_instance.total_distance > 100
    end
  end
end
