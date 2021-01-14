class ApplicationController < ActionController::Base
  
  # get "/puppies" do
    
  #   erb :index
  # end

  def home
    render "/home"
  end
end
