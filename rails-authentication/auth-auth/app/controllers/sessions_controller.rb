class SessionsController < ApplicationController
  skip_before_action :authorize, only: [:new, :create]
  # def new
  # end

  def create
    # find the user by username
    user = User.find_by(username: params[:username])
    # confirm whether the passwords match
    if user.try(:authenticate, params[:password])
    # if user.authenticate(params[:password])
      session[:user_id] = user.id

      redirect_to user_path(user)
    else
      flash.alert = ["incorrect username or password"]
      redirect_to login_path
    end
    # redirect appropriately
  end

  def destroy
    session.delete(:user_id)
    redirect_to login_path
  end
end