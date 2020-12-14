class Pet
  attr_reader :name
  attr_accessor :mood

  def initialize(name, age=0)
    @name = name
    @age = age
    @mood = "nervous"
  end

  def say_hi
    puts "I don't speak"
  end
end