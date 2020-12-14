
class Cat < Pet
  # attr_reader :name
  # attr_accessor :mood

  def initialize(name, age)
    @num_lives = 9
    # @name = name
    super
  #   # @mood = "nervous"
  end

  def say_hi
    puts "MEeeeeow!"
  end
end
