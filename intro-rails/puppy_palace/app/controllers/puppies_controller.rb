class PuppiesController < ApplicationController
  def index
  end

  def show
    @puppy = Puppy.find(params[:id])
  end

  # def new
  # end
end
