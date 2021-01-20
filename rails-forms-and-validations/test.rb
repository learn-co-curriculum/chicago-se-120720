# ternary operator

# condition ? result if true : result if false

class recipes
  belongs_to :category

  def category=(category_name)
    category = Categroy.find_or_create_by(name: category_name)
    recipe.category = category
  end

  def category_name
    self.category ? self.category.name : nil
  end
end