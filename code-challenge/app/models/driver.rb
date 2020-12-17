class Driver
  attr_reader :name

  @@all = []

  def initialize(name)
    @name = name

    @@all << self
  end

  def rides
    Ride.all.select do |ride_instance|
      ride_instance.driver == self
    end
  end

  def passenger_names
    passenger_names = rides.map do |ride_instance|
      ride_instance.passenger.name
    end

    passenger_names.uniq
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

  def self.mileage_cap(distance)
    all.select do |driver_instance|
      driver_instance.total_distance > distance.to_f
    end
  end
end
