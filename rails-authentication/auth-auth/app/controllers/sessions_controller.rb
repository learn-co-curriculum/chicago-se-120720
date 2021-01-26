class SessionsController < ApplicationController

  # def new
  # end

  def create
    # find the user by username
    user = User.find_by(username: params[:username])
    # confirm whether the passwords match
    if user.try(:authenticate, params[:password])
      session[:user_id] = user.id

      redirect_to user_path(user)
    else
      flash.alert = ["incorrect username or password"]
      redirect_to new_session_path
    end
    # redirect appropriately
  end
end