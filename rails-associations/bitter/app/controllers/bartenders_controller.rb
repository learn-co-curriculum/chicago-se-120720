class BartendersController < ApplicationController
  def show
    @bartender = Bartender.find(params[:id])
  end
end
