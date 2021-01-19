class RecipesController < ApplicationController
  def index
    @recipes = Recipe.all
  end

  def show
    @recipe = Recipe.find(params[:id])
  end

  def new
    @recipe = Recipe.new
    @bartenders = Bartender.all
  end

  def create
    recipe = Recipe.create(recipe_params)
    redirect_to recipe_path(recipe)
  end

  # def update_bartender
  #   recipe = Recipe.find(params:id)
  #   recipe.update(recipe_params(:bartender_id))
  # end

  private

  def recipe_params
    params.require(:recipe).permit(:title, :content, :bartender_id)
  end
end
