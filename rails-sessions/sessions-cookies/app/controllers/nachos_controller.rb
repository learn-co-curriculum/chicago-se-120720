class NachosController < ApplicationController
  def index
    @nachos = Nacho.all
  end

  def show
    @nacho = Nacho.find(params[:id])
  end

end
