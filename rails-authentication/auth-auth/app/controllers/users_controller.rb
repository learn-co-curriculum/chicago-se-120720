class UsersController < ApplicationController
  skip_before_action :authorize, only: [:new, :create]

  def show
    @user = User.find(params[:id])
    redirect_to user_path(current_user) if @user != current_user
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)

    if @user.save
      session[:user_id] = @user.id

      redirect_to user_path(@user)
    else
      flash.alert = @user.errors.full_messages
      redirect_to signup_path
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :password, :password_confirmation)
  end
end
