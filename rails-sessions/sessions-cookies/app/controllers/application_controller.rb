class ApplicationController < ActionController::Base
  before_action :get_nachos_from_cart

  def cart 
    session[:cart] ||= []
  end

  def add_item_to_cart(item_id, item_type)
    cart << {id: item_id, type: item_type}
    flash[:notice] = "item added to cart!"
  end

  def get_nachos_from_cart
    @cart_items = Nacho.find(cart)
  end
end
