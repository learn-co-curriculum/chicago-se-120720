class BagelsController < ApplicationController
  before_action :set_bagel, only: [:show, :edit, :update, :destroy]

  # GET /bagels
  # GET /bagels.json
  def index
    @bagels = Bagel.all
  end

  # GET /bagels/1
  # GET /bagels/1.json
  def show
  end

  # GET /bagels/new
  def new
    @bagel = Bagel.new
  end

  # GET /bagels/1/edit
  def edit
  end

  # POST /bagels
  # POST /bagels.json
  def create
    @bagel = Bagel.new(bagel_params)
    byebug
    if @bagel.save
      redirect_to bagel_path(@bagel)
    else
      byebug
      render :new
    end
  end

  # PATCH/PUT /bagels/1
  # PATCH/PUT /bagels/1.json
  def update
    respond_to do |format|
      if @bagel.update(bagel_params)
        format.html { redirect_to @bagel, notice: 'Bagel was successfully updated.' }
        format.json { render :show, status: :ok, location: @bagel }
      else
        format.html { render :edit }
        format.json { render json: @bagel.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /bagels/1
  # DELETE /bagels/1.json
  def destroy
    @bagel.destroy
    respond_to do |format|
      format.html { redirect_to bagels_url, notice: 'Bagel was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_bagel
      @bagel = Bagel.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def bagel_params
      params.require(:bagel).permit(:name, :price, :special)
    end
end
