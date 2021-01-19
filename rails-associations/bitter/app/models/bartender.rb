class Bartender < ApplicationRecord
  has_many :recipes, dependent: :destroy
end
