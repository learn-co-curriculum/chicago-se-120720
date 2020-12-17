require 'pry'

class Bagel
  attr_accessor :salt, :garlic, :poppy_seed, :blueberries

  def initialize(bagel_hash)
    @salt = bagel_hash[:salt]
    @garlic = bagel_hash[:garlic]
    @poppy_seed = bagel_hash[:poppy_seed]
    @blueberries = bagel_hash[:blueberries]
  end

  def bagel_type
    is_everything_bagel = self.salt && self.garlic && self.poppy_seed && !self.blueberries
    is_everything_bagel ? "An everything bagel, great choice!" : "Not sure what to call this..."
  end

end

bagel_one = Bagel.new(salt: true, garlic: true, poppy_seed: true, blueberries: false)
bagel_two = Bagel.new(salt: false, garlic: false, poppy_seed: false, blueberries: false)
bagel_three = Bagel.new(salt: true, garlic: true, poppy_seed: true, blueberries: true)

binding.pry
0
