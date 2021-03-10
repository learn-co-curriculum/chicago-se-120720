
class Api::V1::AuthController < ApplicationController

  def create
    user = User.find_by(username: params[:username])

    if user && user.authenticate(params[:password])
      render json: user
    else
      render json: { error: 'Invalid username or password.'}
    end
  end


end
































# find the user based on the username provided in the form
# if user exists:
#   verify if the password of the user matches the pw entered into the form.
#   if it matches:
#     success!
#     render the user that just logged in
#   else:
#     render an error
# else:
#   render an error


