class Fish < Pet
  # attr_reader :name
  # attr_accessor :mood

  def initialize(name, num_fins, freshwater)
    @num_fins = num_fins
    # @name = name
    @freshwater = freshwater
    super(name)
    # @name = name
    # @mood = "nervous"
  end
end
