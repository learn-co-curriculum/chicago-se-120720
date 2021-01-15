class DoctorsController < ApplicationController
  def index
    @doctors = Doctor.all
  end

  def show
    @doctor = Doctor.find(params[:id])
  end

  def new
    @doctor = Doctor.new
  end

  def create
    byebug
    doctor = Doctor.create(doctor_params)
    redirect_to doctor_path(doctor)
  end

  def destroy_all_doctors

  end

  private

  def doctor_params
    byebug
    params.require(:doctor).permit(:name, :specialty)
  end
end