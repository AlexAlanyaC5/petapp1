class UsersController < ApplicationController

  def create
    user = User.create(name: params["name"], email: params["email"], phone: params["phone"], age: params["age"], gender: params["gender"])
    pet = Pet.create(name: params["petName"], breed: params["breed"], gender: params["petGender"], age: params["petAge"], user_id: user.id)
    render json: user, include: [:pets]
  end

  def login
    user = User.find_by(email: params[:email])
    if user
      render json: user
    else
      render json: {error: "CANNOT LOG IN"}, status: 401
    end
  end

end
