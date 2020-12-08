require 'pry'

spicy_foods = [
  { name: 'Buffalo Wings', cuisine: 'American', heat_level: 3 },
  { name: 'Mapo Tofu', cuisine: 'Sichuan', heat_level: 6 },
  { name: 'Green Curry', cuisine: 'Thai', heat_level: 9 }
]

#given an array of spicy foods, output to the terminal each spicy food in the following format: Buffalo Wings (American) | Heat Level: 🌶🌶🌶
def print_spicy_foods(spicy_foods)
  spicy_foods.each do |spicy_food_hash|
    puts "#{spicy_food_hash[:name]} (#{spicy_food_hash[:cuisine]}) | Heat Level: #{"🌶" * spicy_food_hash[:heat_level]}"
  end
end

#given an array of spicy foods, return an array of strings with the names of each spicy food.
def get_names(spicy_foods)
  spicy_foods.map { |spicy_food_hash| spicy_food_hash[:name] }
end

#given an array of spicy foods, return an array of hashes where the heat level of the food is greater than 5.
def spiciest_foods(spicy_foods)
  spicy_foods.select { |spicy_food_hash| spicy_food_hash[:heat_level] > 5}
end

#given an array of spicy foods and a string representing a cuisine, return a single hash for the spicy food whose cuisine matches the cuisine being passed to the method.
def get_spicy_food_by_cuisine(spicy_foods, cuisine)
  spicy_foods.find { |spicy_food_hash| spicy_food_hash[:cuisine] == cuisine}
end

# BONUS Deliverables
def print_spiciest_foods(spicy_foods)

end

def average_heat_level(spicy_foods)

end

# Use this to test your methods
# run "ruby run.rb" and try calling the methods from the console
binding.pry
"pls"
