
class Api::V1::AuthController < ApplicationController

  def create
    user = User.find_by(username: params[:username])

    if user && user.authenticate(params[:password])
      payload = { user_id: user.id }
      hmac_secret = 'S3CR3T'

      token = JWT.encode(payload, hmac_secret, 'HS256')

      render json: { user: UserSerializer.new(user), token: token }
    else
      render json: { error: 'Invalid username or password.'}
    end
  end

  def show
    token = request.headers[:Authorization].split(' ')[1]
    begin
      decoded_token = JWT.decode(token, 'S3CR3T', true, { algorithm: 'HS256' })
      user_id = decoded_token[0]['user_id']
      user = User.find(user_id)
      render json: user
    rescue JWT::DecodeError
      render json: { error: 'Invalid token.'}
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


