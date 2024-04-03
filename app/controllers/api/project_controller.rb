# frozen_string_literal: true

module Api
  # controller responsible for serving projects
  class ProjectController < ApplicationController
    def index
      @projects = current_user.associated_projects
      render :index
    end

    def show
      @project = Project.find_by(id: params[:id])
      render :show
    end

    def create
      parameters = project_params
      parameters[:owner_id] ||= current_user.id
      @project = Project.new(parameters)

      if @project.save
        render :show
      else
        render json: @project.errors.full_messages
      end
    end

    private

    def project_params
      params.require(:project)
            .permit(:title, :key, :description, :owner_id)
    end
  end
end
