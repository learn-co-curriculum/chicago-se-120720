class InsposController < ApplicationController
  before_action :set_inspo, only: %i[ show edit update destroy ]

  # GET /inspos or /inspos.json
  def index
    @inspos = Inspo.all
  end

  # GET /inspos/1 or /inspos/1.json
  def show
  end

  # GET /inspos/new
  def new
    @inspo = Inspo.new
  end

  # GET /inspos/1/edit
  def edit
  end

  # POST /inspos or /inspos.json
  def create
    @inspo = Inspo.new(inspo_params)

    respond_to do |format|
      if @inspo.save
        format.html { redirect_to @inspo, notice: "Inspo was successfully created." }
        format.json { render :show, status: :created, location: @inspo }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @inspo.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /inspos/1 or /inspos/1.json
  def update
    respond_to do |format|
      if @inspo.update(inspo_params)
        format.html { redirect_to @inspo, notice: "Inspo was successfully updated." }
        format.json { render :show, status: :ok, location: @inspo }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @inspo.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /inspos/1 or /inspos/1.json
  def destroy
    @inspo.destroy
    respond_to do |format|
      format.html { redirect_to inspos_url, notice: "Inspo was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_inspo
      @inspo = Inspo.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def inspo_params
      params.require(:inspo).permit(:title, :code_snippet, :img_url)
    end
end
