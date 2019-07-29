class UsersController < ApplicationController

  def create
    user = User.create(name: params["name"], email: params["email"], phone: params["phone"], age: params["age"], gender: params["gender"])
    pet = Pet.create(name: params["petName"], breed: params["breed"], gender: params["petGender"], age: params["petAge"], user_id: user.id)
    render json: user, include: [:pets]
  end

end
