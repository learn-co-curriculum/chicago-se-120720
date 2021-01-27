class ApplicationController < ActionController::Base
  before_action :authorize
  helper_method :current_user

  def current_user
    User.find(session[:user_id]) if session[:user_id]

    # if session[:user_id]
    #   User.find(session[:user_id])
    # end
  end

  def authorize
    redirect_to login_path unless current_user
  end
end
