class CartsController < ApplicationController

  def update
    add_nacho_to_cart(params[:nacho_id])
    redirect_to nachos_path
  end
end