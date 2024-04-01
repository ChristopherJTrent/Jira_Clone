# frozen_string_literal: true

module Api
  class ProjectController < ApplicationController
    def index 
      @projects = Project.all()
      render json: @projects
    end
    
    def show
      @project = Project.find_by(id: params[:id])
      render :show
    end

    private

    def project_params
      params.require(:project)
            .permit(:title, :description, :owner_id)
    end
  end
end
