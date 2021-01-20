class Bagel < ApplicationRecord
  validates :name, :price, presence: true
  # validates :price, numericality: { less_than: 10 }
  # validates  presence: true
  validate :validate_low_price

  def validate_low_price
    if price > 10
      errors.add(:price, "Needs to be a number less than 10")
    end
  end
end
